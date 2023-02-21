import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppContext } from "./context/app_context";
import Grid from "./components/Grid";
import Upload from "./components/Upload";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import Error from "./components/Error";
import Dtale from "./components/Dtale";
import Login from "./components/Login";
import Chatgpt from "./components/Chatgpt";

const App = () => {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/upload" element={<Upload />} />
				<Route path="/grid" element={<Grid />} />
				<Route path="/visualize-data" element={<Dtale />} />
				<Route path="/login" element={<Login />} />
				<Route path="/chatgpt" element={<Chatgpt />} />
				<Route path="*" element={<Error />} />
				{/* <Route path='grid' element={}/> */}
			</Routes>
		</Router>
	);
};

export default App;
