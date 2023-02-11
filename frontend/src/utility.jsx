export const setSessionStorage = (data, key = "grid") => {
	sessionStorage.setItem(key, JSON.stringify(data));
};

export const getSessionStorage = (key = "grid") => {
	return JSON.parse(sessionStorage.getItem(key));
};

export const clearSessionStorage = () => {
	sessionStorage.clear();
};
