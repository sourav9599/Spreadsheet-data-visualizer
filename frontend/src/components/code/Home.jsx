import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import data from "./code-apps.json";
import { Link } from "react-router-dom";

console.log(data);

export default function ActionAreaCard() {
	return (
		<Box
			sx={{
				flexGrow: 1,
				padding: 5,
				alignContent: "center",
			}}
		>
			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
				direction="row"
				justifyContent="space-evenly"
				alignItems="center"
			>
				{data.map((tool) => (
					<Grid xs={2} sm={4} md={4}>
						<Card sx={{ maxWidth: 345 }}>
							<CardActionArea component={Link} to="/code/chatgpt">
								<CardMedia
									component="img"
									height="140"
									image="../../assets/CODERFX.png"
									alt={tool.name}
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										{tool.name}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{tool.description}
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
