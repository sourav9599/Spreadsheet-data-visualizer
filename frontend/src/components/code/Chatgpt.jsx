import { useRef, useState } from "react";
import "./Chatgpt.css";
import axios from "axios";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
	docco,
	atomOneLight,
	atomOneDark,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import Suggestions from "./Suggestions";
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Typography,
	OutlinedInput,
	InputAdornment,
	IconButton,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import data from "./openai-data.json";
import WebEditor from "./WebEditor";

const YOU = "ME";
const AI = "AI";
function Chatgpt() {
	const inputRef = useRef();
	const [qna, setQna] = useState([]);
	const [loading, setLoading] = useState(false);
	const [hint, setHint] = useState(false);
	const [hintData, setHintData] = useState();

	const [technology, setTechnology] = useState("");
	const [language, setLanguage] = useState("");
	const [apiKey, setApiKey] = useState("");
	const [tokensUsed, setTokensUsed] = useState(0);
	const [showPassword, setShowPassword] = useState(false);

	const updateQNA = (from, value) => {
		setQna((qna) => [...qna, { from, value }]);
	};

	const handleSend = (ignoreHint) => {
		const question = inputRef.current.value;
		updateQNA(YOU, question);
		setLoading(true);
		setHint(false);
		const params = {
			ignore_hint: ignoreHint,
			lang: language,
			tech: technology,
			key: apiKey,
		};
		axios
			.post(
				import.meta.env.VITE_BACKEND_BASE_URL +
					"/chatgpt?" +
					new URLSearchParams(params).toString(),
				{
					question,
				}
			)
			.then((response) => {
				if ("answer" in response.data) {
					console.log(response.data.answer);
					updateQNA(AI, response.data.answer);
					setTokensUsed(response.data.tokens_used);
				}
				if ("hint" in response.data) {
					console.log(response.data);
					setHintData(response.data);
					setTokensUsed(response.data.tokens_used);
					setHint(true);
				}
			})
			.catch((response) => {
				console.log(response.data);
				alert(response.data);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const renderContent = (qna) => {
		const value = qna.value;

		if (Array.isArray(value)) {
			return value.map((v) => (
				<SyntaxHighlighter style={docco}>{v}</SyntaxHighlighter>
			));
		}

		return <SyntaxHighlighter style={docco}>{value}</SyntaxHighlighter>;
	};
	return (
		<main className="container">
			<div className="other-options">
				<Box sx={{ margin: "0 2rem", width: "15rem" }}>
					<FormControl
						required
						fullWidth
						sx={{ background: "#fafafa", marginBottom: "2rem" }}
						variant="outlined"
					>
						<InputLabel htmlFor="outlined-adornment-password">
							OpenAI Key
						</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type={showPassword ? "text" : "password"}
							onChange={(event) => {
								setApiKey(event.target.value);
							}}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={() => setShowPassword((show) => !show)}
										onMouseDown={(event) => event.preventDefault()}
										edge="end"
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label="OpenAI Key"
						/>
					</FormControl>
					<FormControl
						required
						fullWidth
						sx={{ background: "#fafafa", marginBottom: "2rem" }}
					>
						<InputLabel id="demo-simple-select-label">
							Select Language
						</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							label="Language"
							value={language}
							onChange={(event) => {
								setLanguage(event.target.value);
							}}
						>
							{data["languages"].map((lang) => (
								<MenuItem value={lang}>{lang}</MenuItem>
							))}
						</Select>
					</FormControl>
					<Stack direction="column" spacing={2}>
						<FormControl
							required
							fullWidth
							sx={{ background: "#fafafa", marginBottom: "2rem" }}
						>
							<InputLabel id="demo-simple-select-label">
								Select Technology
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								label="technology"
								value={technology}
								onChange={(event) => {
									setTechnology(event.target.value);
								}}
							>
								{data["technology"].map((tech) => (
									<MenuItem value={tech}>{tech}</MenuItem>
								))}
							</Select>
						</FormControl>
						<Box
							display="flex"
							width="100%"
							justifyContent="space-between"
							padding={1}
							border="1px solid gray"
							borderRadius="8px"
							sx={{ backgroundColor: "white" }}
						>
							<Typography variant="h6">Tokens Used: </Typography>
							<Typography variant="h6">{tokensUsed}</Typography>
						</Box>
						<Button variant="contained">
							Fine Tuned based on customer requirements
						</Button>
					</Stack>
				</Box>
			</div>

			<Box
				display="flex"
				flexDirection="column"
				width="100%"
				justifyContent="space-between"
			>
				<div className="chat-input">
					<input
						type="text"
						ref={inputRef}
						className="form-control col"
						placeholder="Type Something"
					/>
					{hint ? (
						<>
							<button
								disabled={loading}
								className="btn btn-success"
								onClick={() => handleSend(true)}
							>
								Re-Send
							</button>
							<Suggestions
								setHint={setHint}
								handleSend={handleSend}
								hintData={hintData}
							/>
						</>
					) : (
						<button
							disabled={loading}
							className="btn btn-success"
							onClick={() => handleSend(false)}
						>
							Send
						</button>
					)}
				</div>
				{qna.length && (
					<WebEditor language={language} value={qna[qna.length - 1].value} />
				)}

				{/* <div className="chats">
					{qna.map((qna) => {
						if (qna.from === YOU) {
							return (
								<div className="send chat">
									<img
										src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
										alt=""
										className="avtar"
									/>
									<p className="message-text">{qna.value}</p>
								</div>
							);
						}
						return (
							<div className="recieve chat">
								<img
									src="https://cdn-icons-png.flaticon.com/512/9626/9626678.png"
									alt=""
									className="avtar"
								/>
								<p className="message-text">{renderContent(qna)}</p>
							</div>
						);
					})}
					{loading && (
						<div className="recieve chat">
							<img
								src="https://cdn-icons-png.flaticon.com/512/9626/9626678.png"
								alt=""
								className="avtar"
							/>
							<p>Typing...</p>
						</div>
					)}
				</div> */}
			</Box>
		</main>
	);
}

export default Chatgpt;
