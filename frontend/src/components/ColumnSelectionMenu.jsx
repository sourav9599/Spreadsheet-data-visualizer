import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Checkbox, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useAppContext } from "../context/app_context";
import { useEffect, useState } from "react";

const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "right",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "right",
		}}
		{...props}
	/>
))(({ theme }) => ({
	"& .MuiPaper-root": {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color:
			theme.palette.mode === "light"
				? "rgb(55, 65, 81)"
				: theme.palette.grey[300],
		boxShadow:
			"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
		"& .MuiMenu-list": {
			padding: "4px 0",
		},
		"& .MuiMenuItem-root": {
			"& .MuiSvgIcon-root": {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			"&:active": {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity
				),
			},
		},
	},
}));

export default function ColumnSelectionMenu({ columns }) {
	const { unChecked, setUnChecked, checked, setChecked } = useAppContext();
	const [searchValue, setSearchValue] = useState("");
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	useEffect(() => {
		const columnNames = columns.map((item) => item.field);
		setChecked(columnNames);
	}, [columns]);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	useEffect(() => {
		setUnChecked(() => {
			const columnNames = columns.map((item) => item.field);
			return columnNames.filter((column) => checked.indexOf(column) < 0);
		});
	}, [checked]);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
		setSearchValue("");
	};
	const handleSearch = (event) => {
		setSearchValue(event.target.value);
	};
	const handleSelectAll = () => {
		setChecked([...checked, ...unChecked]);
		setUnChecked([]);
	};
	return (
		<div>
			<Button
				id="demo-customized-button"
				aria-controls={open ? "demo-customized-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				variant="contained"
				disableElevation
				onClick={handleClick}
				endIcon={<KeyboardArrowDownIcon />}
				sx={{ height: "100%" }}
			>
				Columns
			</Button>
			<StyledMenu
				id="demo-customized-menu"
				MenuListProps={{
					"aria-labelledby": "demo-customized-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				style={{ maxHeight: "500px", overflow: "auto" }}
			>
				<MenuItem disableRipple>
					<FormControlLabel
						control={
							<Checkbox
								onChange={handleSelectAll}
								checked={unChecked.length === 0}
								inputProps={{ "aria-label": "controlled" }}
							/>
						}
						label="Select All"
					/>
				</MenuItem>
				<MenuItem disableRipple onKeyDown={(event) => event.stopPropagation()}>
					<TextField
						value={searchValue}
						onChange={handleSearch}
						label="Columns"
						variant="standard"
					/>
				</MenuItem>

				{columns
					.filter((item) =>
						item.field.toLowerCase().includes(searchValue.toLowerCase())
					)
					.map((item, index) => {
						return (
							<MenuItem key={index} disableRipple>
								<FormControlLabel
									control={
										<Switch
											onChange={handleToggle(item.field)}
											checked={checked.indexOf(item.field) !== -1}
											// inputProps={{
											//   "aria-labelledby": "switch-list-label-wifi"
											// }}
											size="small"
										/>
									}
									label={item.field}
								/>
							</MenuItem>
						);
					})}
			</StyledMenu>
		</div>
	);
}
