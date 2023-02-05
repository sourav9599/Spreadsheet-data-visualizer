import React from "react";
import { GoCloudUpload } from "react-icons/go";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { FormControlLabel } from "@mui/material";

const Form = ({
	handleSubmit,
	handleFileChange,
	filename,
	isHeaderPresent,
	setIsHeaderPresent,
}) => {
	const handleHeaderCheck = (event) => {
		setIsHeaderPresent(event.target.checked);
	};

	return (
		<div className="section-form">
			<h2>Upload Files Here</h2>
			<form onSubmit={handleSubmit} className="form">
				<GoCloudUpload />
				<Button variant="contained" component="label">
					Upload File
					<input
						hidden
						accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
						multiple
						type="file"
						id="file"
						onChange={handleFileChange}
					/>
				</Button>
				{filename && (
					<>
						<label>{filename.name}</label>
						<FormControlLabel
							control={
								<Checkbox
									style={{
										transform: "scale(0.3)",
									}}
									checked={isHeaderPresent}
									onChange={handleHeaderCheck}
									inputProps={{ "aria-label": "controlled" }}
								/>
							}
							label="File with Header data"
						/>
						<Button variant="contained" component="label">
							Submit
							<button type="submit" hidden />
						</Button>
					</>
				)}
			</form>
		</div>
	);
};

export default Form;
