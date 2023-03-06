import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";

function LinkTab(props) {
	return (
		<Tab
			component={Link}
			// onClick={(event) => {
			// 	event.preventDefault();
			// }}
			{...props}
		/>
	);
}

export default function NavTabs() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Tabs
				value={value}
				onChange={handleChange}
				textColor="secondary"
				indicatorColor="secondary"
				aria-label="nav tabs example"
			>
				<LinkTab label="PLAN" to="/spam" />
				<LinkTab label="CODE" to="/code/home" />
				<LinkTab label="BUILD" to="/spam" />
				<LinkTab label="TEST" to="/spam" />
				<LinkTab label="DEPLOY" to="/spam" />
				<LinkTab label="OPERATE" to="/upload" />
			</Tabs>
		</Box>
	);
}
