import React, { useState } from "react";
import axios from "axios";
import Grid from "./Grid";

const Body = () => {
	const [file, setFile] = useState(null);

	const [sessionId, setSessionId] = useState("");

	const [isHeaderPresent, setIsHeaderPresent] = useState(true);

	const [table, setTable] = useState({});

	const handleFileChange = (event) => {
		const file_data = event.target.files[0];
		setFile(file_data);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("file", file);
		const params = {
			hasHeader: isHeaderPresent,
		};
		try {
			const response = await axios.post(
				"http://127.0.0.1:5000/file-upload" +
					"?" +
					new URLSearchParams(params).toString(),
				formData
			);
			setTable(JSON.parse(response.data["table"]));
			setSessionId(response.data["session_id"]);
		} catch (err) {
			console.error(err);
		}
	};
	console.log(table);
	// const describeData = async (event) => {
	// 	event.preventDefault();
	// 	const params = {
	// 		session_id: sessionId,
	// 	};
	// 	try {
	// 		const response = await axios.get(
	// 			"http://127.0.0.1:5000/describe-data" +
	// 				"?" +
	// 				new URLSearchParams(params).toString()
	// 		);
	// 		setTable(response.data);
	// 	} catch (err) {
	// 		setErrorData(err);
	// 		console.error(err);
	// 	}
	// };

	// const loadOriginalData = async (event) => {
	// 	event.preventDefault();
	// 	const params = {
	// 		session_id: sessionId,
	// 	};
	// 	try {
	// 		const response = await axios.get(
	// 			"http://127.0.0.1:5000/load-original" +
	// 				"?" +
	// 				new URLSearchParams(params).toString()
	// 		);
	// 		setTable(response.data);
	// 	} catch (err) {
	// 		setErrorData(err);
	// 		console.error(err);
	// 	}
	// };

	// const displayColumns = async (event) => {
	// 	event.preventDefault();
	// 	const params = {
	// 		session_id: sessionId,
	// 	};
	// 	try {
	// 		const response = await axios.post(
	// 			"http://127.0.0.1:5000/view-columns" +
	// 				"?" +
	// 				new URLSearchParams(params).toString(),
	// 			{
	// 				columns: multiSelectColumnNames,
	// 			}
	// 		);
	// 		setTable(response.data);
	// 	} catch (err) {
	// 		setErrorData(err);
	// 		console.error(err);
	// 	}
	// };

	// const columns = React.useMemo(
	// 	() =>
	// 		Object.keys(table[0] || {}).map((key, index) => ({
	// 			field: !isHeaderPresent ? `Column ${key}` : key,
	// 			headerName: key,
	// 			width: 100,
	// 		})),
	// 	[table]
	// );
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
					multiple
					type="file"
					id="file"
					onChange={handleFileChange}
				/>
				<button type="submit">Submit</button>
			</form>
			<Grid
				table={table}
				setTable={setTable}
				isHeaderPresent={isHeaderPresent}
			/>
		</div>
	);
};

export default Body;
