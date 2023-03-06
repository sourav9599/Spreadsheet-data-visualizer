import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppContext } from "./context/app_context";
import Grid from "./components/operate/Grid.jsx";
import Upload from "./components/operate/Upload.jsx";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import Error from "./components/Error";
import Dtale from "./components/operate/Dtale.jsx";
import Login from "./components/Login";
import NavTabs from "./components/NavTabs";
import Chatgpt from "./components/code/Chatgpt.jsx";
import Home from "./components/code/Home";

const App = () => {
	return (
		<Router>
			<Navbar />
			<NavTabs />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/upload" element={<Upload />} />
				<Route path="/grid" element={<Grid />} />
				<Route path="/visualize-data" element={<Dtale />} />
				<Route path="/login" element={<Login />} />
				<Route path="/code/chatgpt" element={<Chatgpt />} />
				<Route path="/code/home" element={<Home />} />
				<Route path="*" element={<Error />} />
				{/* <Route path='grid' element={}/> */}
			</Routes>
		</Router>
	);
};

export default App;
