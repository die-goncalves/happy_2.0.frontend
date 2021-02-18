import React, { createContext, useContext, useState } from "react";
import { RouteProps } from "react-router-dom";
import api from "../services/api";

interface AuthContextData {
  isLoggedIn: boolean;
  logIn(data: FormData): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: RouteProps) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  async function logIn(data: FormData) {
    const response = await api.post("/user/authenticate", data);

    api.defaults.headers["authorization"] = `Bearer ${response.data.token}`;
    setIsAuthorized(true);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isAuthorized,
        logIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
