import {
	AppBar,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Divider,
	Box,
	Button,
	IconButton,
	Stack,
	Toolbar,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MailIcon from "@mui/icons-material/Mail";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";

import { styled, useTheme } from "@mui/material/styles";

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

const Navbar = () => {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	return (
		<Box sx={{ display: "flex" }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={() => setOpen(true)}
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Stack minWidth="80vw" direction="row" justifyContent="space-between">
						<Link to="/">
							<img src={logo} alt="logo" />
						</Link>
						<Stack direction="row" spacing={2}>
							<Link
								to="/"
								style={{ textDecoration: "none", color: "var(--white)" }}
							>
								<Button variant="inherit">Home</Button>
							</Link>
							<Link
								to="/upload"
								style={{ textDecoration: "none", color: "var(--white)" }}
							>
								<Button variant="inherit">Tool</Button>
							</Link>
							<Button color="inherit">About</Button>
							<Link
								to="/login"
								style={{ textDecoration: "none", color: "var(--white)" }}
							>
								<Button color="inherit">Login</Button>
							</Link>
						</Stack>
					</Stack>
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					width: 240,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: 240,
						boxSizing: "border-box",
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader>
					<IconButton onClick={() => setOpen(false)}>
						{theme.direction === "ltr" ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{["Dataset", "EDA", "Model Training", "Prediction"].map(
						(text, index) => (
							<ListItem key={text} disablePadding>
								<Link
									to="/"
									style={{ textDecoration: "none", color: "var(--white)" }}
								>
									<ListItemButton>
										<ListItemIcon>
											{index % 2 === 0 ? <TroubleshootIcon /> : <MailIcon />}
										</ListItemIcon>
										<ListItemText primary={text} />
									</ListItemButton>
								</Link>
							</ListItem>
						)
					)}
					<ListItem key="Chatgpt" disablePadding>
						<Link
							to="/chatgpt"
							style={{ textDecoration: "none", color: "var(--white)" }}
						>
							<ListItemButton>
								<ListItemIcon>
									<TroubleshootIcon />
								</ListItemIcon>
								<ListItemText primary="Chatgpt" />
							</ListItemButton>
						</Link>
					</ListItem>
				</List>
				<Divider />
			</Drawer>
		</Box>
	);
};

export default Navbar;
