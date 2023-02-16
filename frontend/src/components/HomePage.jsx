import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomePage = () => {
	return (
		<Box
			minHeight="calc(100vh - 64px)"
			display="flex"
			justifyContent="space-around"
			alignItems="center"
		>
			<Stack maxWidth="1200px" minWidth="750px">
				<Grid container spacing={7} alignItems="center">
					<Grid item xs={6}>
						<img
							src="src\assets\visualization.svg"
							alt="visualization image"
							height="80%"
							width="80%"
						/>
					</Grid>
					<Grid item xs={6} color={{ color: "var(--clr-primary-500)" }}>
						<Typography
							variant="h2"
							fontWeight={700}
							gutterBottom
							component="h1"
						>
							APP ENGINEERING AUTOMATION
						</Typography>
						<Typography variant="subtitle1">
							Toolkit for deploying ML Models!!!!!!
						</Typography>

						<Stack marginTop={6}>
							<Link
								to="upload"
								style={{ textDecoration: "none", color: "var(--white)" }}
							>
								<Button
									variant="contained"
									size="large"
									sx={{ fontWeight: "700" }}
								>
									Tool
								</Button>
							</Link>
							{/* <Button variant='contained'></Button> */}
						</Stack>
					</Grid>
				</Grid>
			</Stack>
		</Box>
	);
};

export default HomePage;
