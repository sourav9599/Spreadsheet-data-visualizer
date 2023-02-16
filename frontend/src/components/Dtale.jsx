import React from "react";
import Iframe from "react-iframe";
import { useAppContext } from "../context/app_context";
import { Stack } from "@mui/material";
const Dtale = () => {
	const { dtaleIframe, setDtaleIframe } = useAppContext();
	console.log(dtaleIframe);
	const iframeDataURL = "http://127.0.0.1:5000" + dtaleIframe;
	const iframeChartsURL = iframeDataURL.replace("/main/", "/charts/");
	return (
		<Stack
			spacing={2}
			width="80vw"
			maxHeight="calc(100vh - 64px)"
			margin="0 auto"
			padding={4}
		>
			<Iframe
				url={iframeDataURL}
				width="1200px"
				height="800px"
				display="block"
				position="relative"
			/>
			<Iframe
				url={iframeChartsURL}
				width="1200px"
				height="800px"
				display="block"
				position="relative"
			/>
		</Stack>
	);
};

export default Dtale;
