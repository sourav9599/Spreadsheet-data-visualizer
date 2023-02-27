import { useRef, useState } from "react";
import "./Chatgpt.css";
import axios from "axios";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
	docco,
	atomOneLight,
	atomOneDark,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

const YOU = "ME";
const AI = "AI";
function Chatgpt() {
	const inputRef = useRef();
	const [qna, setQna] = useState([]);
	const [loading, setLoading] = useState(false);

	const updateQNA = (from, value) => {
		setQna((qna) => [...qna, { from, value }]);
	};

	const handleSend = () => {
		const question = inputRef.current.value;
		updateQNA(YOU, question);

		setLoading(true);
		axios
			.post("http://localhost:5000/chatgpt", {
				question,
			})
			.then((response) => {
				console.log(response.data.answer);
				updateQNA(AI, response.data.answer);
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
			<div className="chats">
				{qna.map((qna) => {
					if (qna.from === YOU) {
						return (
							<div className="send chat">
								<img
									src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
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
								src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
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
							src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
							alt=""
							className="avtar"
						/>
						<p>Typing...</p>
					</div>
				)}
			</div>

			<div className="chat-input">
				<input
					type="text"
					ref={inputRef}
					className="form-control col"
					placeholder="Type Something"
				/>
				<button
					disabled={loading}
					className="btn btn-success"
					onClick={handleSend}
				>
					Send
				</button>
			</div>
		</main>
	);
}

export default Chatgpt;
