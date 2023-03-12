import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
	docco,
	atomOneLight,
	atomOneDark,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}));

function BootstrapDialogTitle(props) {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
}

BootstrapDialogTitle.propTypes = {
	children: PropTypes.node,
	onClose: PropTypes.func.isRequired,
};

export default function Suggestions({ setHint, hintData }) {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
		setHint(false);
	};

	return (
		<div>
			<Button variant="contained" color="info" onClick={handleClickOpen}>
				similar search found. Click to view
			</Button>
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<BootstrapDialogTitle
					id="customized-dialog-title"
					onClose={handleClose}
				>
					{hintData["input_text"]}
				</BootstrapDialogTitle>
				<DialogContent dividers>
					<Typography gutterBottom>
						<SyntaxHighlighter style={docco}>
							{hintData["hint"]}
						</SyntaxHighlighter>
					</Typography>
				</DialogContent>
				<DialogActions>
					<Typography gutterBottom>Searched on {hintData["time"]} </Typography>
					<Button autoFocus onClick={() => setOpen(false)}>
						Re-search
					</Button>
				</DialogActions>
			</BootstrapDialog>
		</div>
	);
}
