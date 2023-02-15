import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "./styles.css";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import ColumnSelectionMenu from "./ColumnSelectionMenu";
import { useAppContext } from "../context/app_context";
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

	const { table, setTable, isHeaderPresent } = useAppContext();

	const getFilterType = (value) => {
		if (typeof value === "number") return "agNumberColumnFilter";
		if (typeof value === "string") return "agTextColumnFilter";
		if (value instanceof Date) return "agDateColumnFilter";
		return null;
	};

	useEffect(() => {
		if (Object.keys(table).length) {
			let columns = table["schema"]["fields"].map((colname) => ({
				field: !isHeaderPresent ? `Column ${colname["name"]}` : colname["name"],
				headerName: colname["name"],
				filter: getFilterType(table["data"][0][colname["name"]]),
				width: 200,
				// cellEditor: getCellEditorType(table[0][key]),
			}));
			setTableColumnData(columns);
			setTableRowData(table["data"]);
		}
	}, [table]);
	// const columns = useMemo(
	// 	() =>
	// 		Object.keys(table[0] || {}).map((key) => ({
	// 			field: !isHeaderPresent ? `Column ${key}` : key,
	// 			headerName: key,
	// 			filter: getFilterType(table[0][key]),
	// 			width: 200,
	// 			// cellEditor: getCellEditorType(table[0][key]),
	// 		})),
	// 	[table]
	// );

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
		if (unChecked.length || checked.length) {
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

	const saveState = () => {
		window.colState = gridColumnApi.getColumnState();
		console.log("column state saved", gridColumnApi.getColumnState());
	};

	const restoreState = () => {
		if (!window.colState) {
			console.log("no columns state to restore by, you must save state first");
			return;
		}
		gridColumnApi.applyColumnState({
			state: window.colState,
			applyOrder: true,
		});
		console.log("column state restored");
	};

	const resetState = () => {
		gridColumnApi.resetColumnState();
		console.log("column state reset");
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

	const visualizeData = () => {
		let data = Papa.parse(gridRowApi.getDataAsCsv(), {
			header: true,
			dynamicTyping: true,
		})["data"];
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
				<Button variant="contained" onClick={saveState}>
					Save State
				</Button>
				<Button variant="contained" onClick={restoreState}>
					Restore State
				</Button>
				<Button variant="contained" onClick={resetState}>
					Reset State
				</Button>
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
					Visualize Data
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
