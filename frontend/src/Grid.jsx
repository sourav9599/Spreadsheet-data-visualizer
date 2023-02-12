import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "./styles.css";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import ColumnSelectionMenu from "./ColumnSelectionMenu";
import { useAppContext } from "./context/app_context";

const Grid = ({ table, setTable, isHeaderPresent }) => {
	const [gridRowApi, setGridRowApi] = useState();
	const [gridColumnApi, setGridColumnApi] = useState();
	const { unChecked, checked } = useAppContext();
	const [tableRowData, setTableRowData] = useState([]);
	const [tableColumnData, setTableColumnData] = useState([]);

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
			console.log(tableRowData, tableColumnData);
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
		if (unChecked.length && checked.length) {
			gridColumnApi.setColumnsVisible(unChecked, false);
			gridColumnApi.setColumnsVisible(checked, true);
			// gridRowApi.sizeColumnsToFit();
		}
	};
	const deleteRow = (selectedRows) => {
		console.log(selectedRows);
		setTableRowData(tableRowData.filter((row) => !selectedRows.includes(row)));
	};

	const onQuickFilterValueChange = (e) => {
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
		console.log(data);
	};

	useEffect(() => {
		showOrHideColumns();
	}, [unChecked, checked]);

	return (
		<div>
			<button onClick={exportAsCSV}>Export As CSV</button>
			<button onClick={exportAsExcel}>Export As Excel</button>
			<div>
				<button onClick={saveState}>Save State</button>
				<button onClick={restoreState}>Restore State</button>
				<button onClick={resetState}>Reset State</button>
			</div>
			<input
				type="search"
				onChange={onQuickFilterValueChange}
				placeholder="Quick filter"
			/>
			<div
				className="ag-theme-alpine"
				style={{ width: "100%", height: "700px" }}
			>
				<ColumnSelectionMenu columns={tableColumnData} />
				<button onClick={() => deleteRow(gridRowApi.getSelectedRows())}>
					Delete Selected Rows
				</button>
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
				<button
					onClick={visualizeData}
					style={{
						marginTop: "10px",
						marginLeft: "50%",
					}}
				>
					Visualize Data
				</button>
			</div>
		</div>
	);
};

export default Grid;
