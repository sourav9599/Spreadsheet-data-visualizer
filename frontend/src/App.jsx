import React, {
	useState,
	useRef,
	useEffect,
	useMemo,
	useCallback,
} from "react";

import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "./styles.css";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import ColumnSelectionMenu from "./ColumnSelectionMenu";
const App = ({ table, isHeaderPresent }) => {
	const [rowData, setRowData] = useState(table); // Set rowData to Array of Objects, one Object per Row
	const [gridRowApi, setGridRowApi] = useState();
	const [gridColumnApi, setGridColumnApi] = useState();
	const [hideColumns, setHideColumns] = useState(false);
	// Each Column Definition results in one Column.
	const getFilterType = (value) => {
		if (typeof value === "number") return "agNumberColumnFilter";
		if (typeof value === "string") return "agTextColumnFilter";
		if (value instanceof Date) return "agDateColumnFilter";
		return false;
	};

	// const getCellEditorType = (value) => {
	// 	if (typeof value === "number") return AgNumberCellEditor;
	// 	if (typeof value === "string") return AgTextCellEditor;
	// 	if (value instanceof Date) return AgDateCellEditor;
	// 	return null;
	// };

	const columns = useMemo(
		() =>
			Object.keys(table[0] || {}).map((key) => ({
				field: !isHeaderPresent ? `Column ${key}` : key,
				headerName: key,
				filter: getFilterType(table[0][key]),
				// cellEditor: getCellEditorType(table[0][key]),
			})),
		[table]
	);

	const [columnDefs, setColumnDefs] = useState(columns);

	// DefaultColDef sets props common to all Columns
	const defaultColDef = useMemo(() => ({
		sortable: true,
		resizable: true,
		editable: true,
		floatingFilter: true,
		flex: 1,
		checkboxSelection: false,
		headerCheckboxSelection: false,
	}));

	console.log(table, columns);
	// Example of consuming Grid Event
	const cellClickedListener = "";

	// Example load data from sever
	// useEffect(() => {
	// 	fetch("https://www.ag-grid.com/example-assets/row-data.json")
	// 		.then((result) => result.json())
	// 		.then((rowData) => setRowData(rowData));
	// }, []);

	// Example using Grid's API
	// const buttonListener = useCallback((e) => {
	// 	gridRef.current.api.deselectAll();
	// }, []);

	const onGridReady = (e) => {
		setGridRowApi(e.api);
		setGridColumnApi(e.columnApi);
	};

	const exportData = () => {
		gridRowApi.exportDataAsCsv();
	};

	//function will trigger once selection changed
	const onSelectionChanged = (event) => {
		console.log(event.api.getSelectedRows());
	};

	const showColumns = () => {
		// for single column
		// gridColumnApi.setColumnVisible('dob',hideColumn)

		// for multiple columns
		gridColumnApi.setColumnsVisible(["dob", "price"], hideColumns);
		setHideColumns(!hideColumns);
		// to fit the size of column
		gridRowApi.sizeColumnsToFit();
	};

	const onQuickFilterValueChange = (e) => {
		gridRowApi.setQuickFilter(e.target.value);
	};

	return (
		<div>
			{/* Example using Grid's API */}
			<button onClick={exportData}>Export Data</button>
			<button onClick={showColumns}>Show Columns</button>
			<input
				type="search"
				onChange={onQuickFilterValueChange}
				placeholder="Quick filter"
			/>
			{/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
			<div
				className="ag-theme-alpine"
				style={{ width: "100%", height: "800px" }}
			>
				<ColumnSelectionMenu columns={columns} />
				<AgGridReact
					rowData={table} // Row Data for Rows
					columnDefs={columns} // Column Defs for Columns
					defaultColDef={defaultColDef} // Default Column Properties
					animateRows={true} // Optional - set to 'true' to have rows animate when sorted
					rowSelection="multiple" // Options - allows click selection of rows
					// onCellClicked={cellClickedListener} // Optional - registering for Grid Event
					onGridReady={onGridReady}
					onSelectionChanged={onSelectionChanged}
					pagination={true}
					paginationAutoPageSize={true}
					onRowEditingStarted
					onRowEditingStopped
					undoRedoCellEditing={true}
					undoRedoCellEditingLimit={20}
					enableCellChangeFlash={true}
					overlayLoadingTemplate={
						'<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'
					}
					overlayNoRowsTemplate={
						"<span style=\"padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow\">This is a custom 'no rows' overlay</span>"
					}
				/>
			</div>
		</div>
	);
};

export default App;
