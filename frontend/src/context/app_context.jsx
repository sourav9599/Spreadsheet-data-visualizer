import React, { useContext, useState } from "react";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
	const [unChecked, setUnChecked] = useState([]);
	const [menuItem, setMenuItem] = useState({});
	const [checked, setChecked] = useState([]);
	const [loading, setLoading] = useState(false);
	const [dtaleDataIframe, setDtaleDataIframe] = useState("");
	const [dtaleChartsIframe, setDtaleChartsIframe] = useState("");

	// From Previous App Component

	const [file, setFile] = useState(null);
	const [sessionId, setSessionId] = useState("");
	const [isHeaderPresent, setIsHeaderPresent] = useState(false);
	const [table, setTable] = useState({});

	return (
		<AppContext.Provider
			value={{
				unChecked,
				setUnChecked,
				checked,
				setChecked,
				file,
				setFile,
				sessionId,
				setSessionId,
				isHeaderPresent,
				setIsHeaderPresent,
				table,
				setTable,
				loading,
				setLoading,
				dtaleDataIframe,
				setDtaleDataIframe,
				dtaleChartsIframe,
				setDtaleChartsIframe,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};
