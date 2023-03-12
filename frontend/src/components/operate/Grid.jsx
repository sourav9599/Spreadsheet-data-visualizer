import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "./styles.css";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import ColumnSelectionMenu from "./ColumnSelectionMenu.jsx";
import { useAppContext } from "../../context/app_context.jsx";
import axios from "axios";
import {
	Button,
	ButtonGroup,
	Stack,
	FormControlLabel,
	TextField,
	Box,
} from "@mui/material";

const Grid = () => {
	const [gridRowApi, setGridRowApi] = useState();
	const [gridColumnApi, setGridColumnApi] = useState();
	const { unChecked, checked } = useAppContext();
	const [tableRowData, setTableRowData] = useState([]);
	const [tableColumnData, setTableColumnData] = useState([]);

	const {
		table,
		setTable,
		sessionId,
		isHeaderPresent,
		setDtaleDataIframe,
		setDtaleChartsIframe,
	} = useAppContext();
	const getFilterType = (value) => {
		if (typeof value === "number") return "agNumberColumnFilter";
		if (typeof value === "string") return "agTextColumnFilter";
		if (value instanceof Date) return "agDateColumnFilter";
		return null;
	};

	useEffect(() => {
		if (table["data"]) {
			let columns = Object.keys(table["data"][0]).map((colname) => ({
				field: colname,
				headerName: !isHeaderPresent ? "Column" + colname : colname,
				filter: getFilterType(table["data"][0][colname]),
				width: 200,
				// cellEditor: getCellEditorType(table[0][key]),
			}));
			setTableColumnData(columns);
			setTableRowData(table["data"]);
		}
	}, [table]);

	const visualizeData = async (event) => {
		event.preventDefault();
		const params = {
			session_id: sessionId,
		};
		try {
			const response = await axios.post(
				import.meta.env.VITE_BACKEND_BASE_URL +
					"/visualize-data" +
					"?" +
					new URLSearchParams(params).toString()
			);
			setDtaleDataIframe(response.data["dtale_instance_url"]);
			setDtaleChartsIframe(
				response.data["dtale_instance_url"].replace("/main/", "/charts/")
			);
		} catch (err) {
			console.error(err);
		}
	};

	const defaultColDef = useMemo(() => ({
		sortable: true,
		resizable: true,
		editable: true,
		floatingFilter: true,
		checkboxSelection: false,
		headerCheckboxSelection: true,
	}));

	const onGridReady = (e) => {
		setGridRowApi(e.api);
		setGridColumnApi(e.columnApi);
	};

	const onSelectionChanged = (event) => {
		console.log(event.api.getSelectedRows());
	};

	const showOrHideColumns = () => {
		if ((unChecked.length || checked.length) && gridColumnApi) {
			gridColumnApi.setColumnsVisible(unChecked, false);
			gridColumnApi.setColumnsVisible(checked, true);
			// gridRowApi.sizeColumnsToFit();
		}
	};
	const deleteRow = (selectedRows) => {
		setTableRowData(tableRowData.filter((row) => !selectedRows.includes(row)));
	};

	const onQuickFilterValueChange = (e) => {
		console.log(e.target.value);
		gridRowApi.setQuickFilter(e.target.value);
	};

	const exportAsExcel = () => {
		let data = Papa.parse(gridRowApi.getDataAsCsv(), {
			header: true,
			dynamicTyping: true,
		})["data"];
		let worksheet = XLSX.utils.json_to_sheet(data);
		let workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
		//let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
		//XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
		XLSX.writeFile(workbook, "export.xlsx");
	};

	const exportAsCSV = () => {
		gridRowApi.exportDataAsCsv();
	};

	useEffect(() => {
		showOrHideColumns();
	}, [unChecked, checked]);

	return (
		<Stack
			spacing={2}
			width="80vw"
			maxHeight="calc(100vh - 64px)"
			margin="0 auto"
			padding={4}
		>
			<ButtonGroup>
				<Button variant="contained">Save State</Button>
				<Button variant="contained">Restore State</Button>
				<Button variant="contained">Reset State</Button>
			</ButtonGroup>

			<Stack direction="row" spacing={2} justifyContent="space-between">
				<TextField
					label="Quick Filter"
					size="small"
					sx={{ backgroundColor: "var(--clr-primary-100)" }}
					onChange={onQuickFilterValueChange}
				/>
				<Stack direction="row" spacing={2}>
					<ColumnSelectionMenu columns={tableColumnData} />
					<Button
						variant="contained"
						size="small"
						disableElevation
						color="error"
						onClick={() => deleteRow(gridRowApi.getSelectedRows())}
					>
						Delete Selected Rows
					</Button>
				</Stack>
			</Stack>
			<div
				className="ag-theme-alpine"
				style={{ width: "100%", height: "700px" }}
			>
				<AgGridReact
					rowData={tableRowData} // Row Data for Rows
					columnDefs={tableColumnData} // Column Defs for Columns
					defaultColDef={defaultColDef} // Default Column Properties
					animateRows={true} // Optional - set to 'true' to have rows animate when sorted
					rowSelection="multiple" // Options - allows click selection of rows
					// onCellClicked={cellClickedListener} // Optional - registering for Grid Event
					onGridReady={onGridReady}
					onSelectionChanged={onSelectionChanged}
					pagination={true}
					paginationPageSize={20}
					paginationAutoPageSize={false}
					onRowEditingStarted
					onRowEditingStopped
					undoRedoCellEditing={true}
					undoRedoCellEditingLimit={20}
					enableCellChangeFlash={true}
					overlayLoadingTemplate={
						'<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'
					}
					overlayNoRowsTemplate={
						'<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow">Please Upload a File....</span>'
					}
				/>
			</div>
			<Stack direction="row" justifyContent="space-between">
				<Button variant="contained" onClick={visualizeData}>
					<Link
						to="/visualize-data"
						style={{
							textDecoration: "none",
							color: "var(--white)",
							width: "100%",
						}}
					>
						Visualize Data
					</Link>
				</Button>
				<ButtonGroup variant="contained" color="success">
					<Button onClick={exportAsCSV}>Export As CSV</Button>
					<Button onClick={exportAsExcel}>Export As Excel</Button>
				</ButtonGroup>
			</Stack>
		</Stack>
	);
};

export default Grid;
