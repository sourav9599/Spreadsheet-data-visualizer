import React, { useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import FormStyle from "../component-styles/FormStyle";

import Form from "./Form";
import Filters from "./Filters";

const Header = () => {
	const [file, setFile] = useState(null);
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
		try {
			const response = await axios.post(
				"http://127.0.0.1:5000/file-upload",
				formData
			);
			setTable(response.data);
			setIsUploaded(true);
		} catch (err) {
			setErrorData(err);
			console.error(err);
		}
	};
	const columns = React.useMemo(
		() =>
			Object.keys(table[0] || {}).map((key) => ({
				name: `Column ${key}`,
				selector: key,
				sortable: true,
			})),
		[table]
	);
	return (
		<FormStyle>
			{!isUploaded && (
				<>
					<Form
						handleSubmit={handleSubmit}
						handleFileChange={handleFileChange}
					/>
					<pre>{JSON.stringify(errorData)}</pre>
				</>
			)}
			{isUploaded && (
				<>
					<Filters />
					<Form
						handleSubmit={handleSubmit}
						handleFileChange={handleFileChange}
					/>
					<div style={{ overflow: "auto" }} className="section-table">
						<DataTable
							columns={columns}
							data={table}
							pagination
							paginationPerPage={10}
						/>
					</div>
				</>
			)}
		</FormStyle>
	);
};

export default Header;
