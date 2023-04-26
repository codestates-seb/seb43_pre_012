import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    refreshToken: null,
  });

  const setAuthInfo = ({ token, refreshToken }) => {
    setAuthState({
      token,
      refreshToken,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState: authInfo => setAuthInfo(authInfo),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};