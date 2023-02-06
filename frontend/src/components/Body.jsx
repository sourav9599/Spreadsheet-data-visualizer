import React, { useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import FormStyle from "../component-styles/FormStyle";

import Form from "./Form";
import Filters from "./Filters";
import { Box } from "@mui/system";
import FilterOptions from "./FilterOptions";

const Body = () => {
	const [file, setFile] = useState(null);

	const [sessionId, setSessionId] = useState("");

	const [isHeaderPresent, setIsHeaderPresent] = useState(false);

	const [multiSelectColumnNames, setMultiSelectColumnNames] = React.useState(
		[]
	);

	const [table, setTable] = useState([{}]);

	const [isUploaded, setIsUploaded] = useState(false);

	const [errorData, setErrorData] = useState();

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
			setTable(response.data["data"]);
			setSessionId(response.data["session_id"]);
			setIsUploaded(true);
		} catch (err) {
			setErrorData(err);
			console.error(err);
		}
	};

	const describeData = async (event) => {
		event.preventDefault();
		const params = {
			session_id: sessionId,
		};
		try {
			const response = await axios.get(
				"http://127.0.0.1:5000/describe-data" +
					"?" +
					new URLSearchParams(params).toString()
			);
			setTable(response.data);
		} catch (err) {
			setErrorData(err);
			console.error(err);
		}
	};

	const loadOriginalData = async (event) => {
		event.preventDefault();
		const params = {
			session_id: sessionId,
		};
		try {
			const response = await axios.get(
				"http://127.0.0.1:5000/load-original" +
					"?" +
					new URLSearchParams(params).toString()
			);
			setTable(response.data);
		} catch (err) {
			setErrorData(err);
			console.error(err);
		}
	};

	const displayColumns = async (event) => {
		event.preventDefault();
		const params = {
			session_id: sessionId,
		};
		try {
			const response = await axios.post(
				"http://127.0.0.1:5000/view-columns" +
					"?" +
					new URLSearchParams(params).toString(),
				{
					columns: multiSelectColumnNames,
				}
			);
			setTable(response.data);
		} catch (err) {
			setErrorData(err);
			console.error(err);
		}
	};

	const columns = React.useMemo(
		() =>
			Object.keys(table[0] || {}).map((key) => ({
				name: !isHeaderPresent ? `Column ${key}` : key,
				selector: key,
				sortable: true,
			})),
		[table]
	);
	console.log(sessionId);
	return (
		<FormStyle>
			{!isUploaded && (
				<>
					<Form
						handleSubmit={handleSubmit}
						handleFileChange={handleFileChange}
						filename={file}
						isHeaderPresent={isHeaderPresent}
						setIsHeaderPresent={setIsHeaderPresent}
					/>
					{JSON.stringify(errorData)}
				</>
			)}
			{isUploaded && (
				<>
					<Filters />
					<Form
						handleSubmit={handleSubmit}
						handleFileChange={handleFileChange}
						filename={file}
						isHeaderPresent={isHeaderPresent}
						setIsHeaderPresent={setIsHeaderPresent}
					/>
					<div style={{ overflow: "auto" }} className="section-table">
						<FilterOptions
							columns={columns}
							columnNames={multiSelectColumnNames}
							setColumnNames={setMultiSelectColumnNames}
							describeData={describeData}
							displayColumns={displayColumns}
							loadOriginalData={loadOriginalData}
						/>
						<div>
							<DataTable
								columns={columns}
								data={table}
								pagination
								paginationPerPage={10}
							/>
						</div>
					</div>
				</>
			)}
		</FormStyle>
	);
};

export default Body;
