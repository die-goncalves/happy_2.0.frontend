import React, { createContext, useContext, useEffect, useState } from "react";
import { RouteProps } from "react-router-dom";
import api from "../services/api";
import jwt_decode from "jwt-decode";

interface AuthContextData {
  isLoggedIn: boolean;
  isLoading: boolean;
  logIn(data: FormData, remember: string): Promise<void>;
  logOut(): void;
}

interface Decode {
  _id: any;
  iat: number;
  exp: number;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider = ({ children }: RouteProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("@Happy: token");
    if (token) {
      const decoded: Decode = jwt_decode(token);
      const current_time = new Date().getTime() / 1000;
      if (current_time < decoded.exp) {
        api.defaults.headers["authorization"] = `Bearer ${token}`;
        setIsLoggedIn(true);
        setIsLoading(false);
      } else {
        logOut();
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  async function logIn(data: FormData, remember: string) {
    const response = await api.post("/user/authenticate", data);

    api.defaults.headers["authorization"] = `Bearer ${response.data.token}`;
    if (remember === "true") {
      localStorage.setItem("@Happy: token", response.data.token);
    }
    setIsLoggedIn(true);
  }

  function logOut() {
    setIsLoggedIn(false);
    setIsLoading(false);
    const keysToRemove = ["@Happy: token"];
    keysToRemove.forEach((item) => localStorage.removeItem(item));
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        logIn,
        logOut,
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
