import React from "react";
import Iframe from "react-iframe";
import { useAppContext } from "../../context/app_context.jsx";
import { Stack, ButtonGroup, Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

const Dtale = () => {
	const { dtaleDataIframe, sessionId, dtaleChartsIframe } = useAppContext();
	const iframeDataURL = import.meta.env.VITE_BACKEND_BASE_URL + dtaleDataIframe;
	const iframeChartsURL =
		import.meta.env.VITE_BACKEND_BASE_URL + dtaleChartsIframe;
	console.log(iframeChartsURL, iframeDataURL);

	const saveData = async () => {
		const params = {
			session_id: sessionId,
		};
		try {
			const response = await axios.post(
				import.meta.env.VITE_BACKEND_BASE_URL +
					"/update-data?" +
					new URLSearchParams(params).toString()
			);
			alert(response.data["message"]);
		} catch (err) {
			console.error(err);
		}
	};

	const deleteDtaleInstance = async () => {
		const params = {
			session_id: sessionId,
		};
		try {
			const response = await axios.post(
				import.meta.env.VITE_BACKEND_BASE_URL +
					"/kill-dtale-instance" +
					"?" +
					new URLSearchParams(params).toString()
			);
			alert(response.data["message"]);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<Stack
				// spacing={2}
				// width="80vw"
				// minHeight="calc(100vh - 64px)"
				// margin="0 auto"
				paddingTop={4}
				direction="row"
				justifyContent="space-evenly"
				alignItems="flex-start"
			>
				<Item>
					<Iframe
						url={iframeDataURL}
						width="1200px"
						height="800px"
						display="block"
						position="relative"
					/>
				</Item>
			</Stack>
			<Stack direction="row" padding={2} justifyContent="space-evenly">
				<Button
					href={iframeDataURL}
					color="inherit"
					variant="contained"
					endIcon={<OpenInNewIcon />}
					target="_blank"
					rel="noreferrer noopener"
				>
					Edit Data
				</Button>
				<Button
					variant="contained"
					color="inherit"
					href={iframeChartsURL}
					startIcon={<AnalyticsIcon />}
					endIcon={<OpenInNewIcon />}
					target="_blank"
					rel="noreferrer noopener"
				>
					Visualize Data
				</Button>
			</Stack>
			<Stack direction="row" padding={2} justifyContent="space-evenly">
				<Button variant="contained" startIcon={<SaveIcon />} onClick={saveData}>
					Save Data
				</Button>
				<Button
					variant="contained"
					color="error"
					startIcon={<DeleteForeverIcon />}
					onClick={deleteDtaleInstance}
				>
					Delete Instance
				</Button>
				<ButtonGroup variant="contained" color="success">
					<Button>Export As CSV</Button>
					<Button>Export As Excel</Button>
				</ButtonGroup>
			</Stack>
		</>
	);
};

export default Dtale;
