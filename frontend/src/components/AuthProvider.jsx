import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { getCookie, setCookie } from "../utils/cookies";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [authState, setAuthState] = useState({
		token: "token",
		refresh: "refresh",
	});
	useEffect(() => {
		setAuthState((prev) => ({
			...prev,
			token: getCookie("token"),
			refresh: getCookie("refresh"),
		}));
	}, []);

	const setAuthInfo = ({ token, refresh }) => {
		setAuthState({
			token,
			refresh,
		});
		setCookie("token", token);
		setCookie("refresh", refresh);
	};

	return (
		<AuthContext.Provider
			value={{
				authState,
				setAuthState: (authInfo) => setAuthInfo(authInfo),
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuthContext() {
	return useContext(AuthContext);
}
