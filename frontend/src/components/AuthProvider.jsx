import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { deleteCookie, getCookie, setCookie } from "../utils/cookies";

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
	const deleteAuthInfo = () => {
		deleteCookie("token");
		deleteCookie("refresh");
		setAuthInfo({
			token: null,
			refresh: null,
		});
	};

	return (
		<AuthContext.Provider
			value={{
				authState,
				setAuthState: (authInfo) => setAuthInfo(authInfo),
				deleteAuthInfo,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

//jh
export function useAuthContext() {
	return useContext(AuthContext);
}
