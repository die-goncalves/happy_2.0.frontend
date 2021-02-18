import React from "react";
import Routes from "./routes";
import "./styles/global.css";
import { AuthProvider } from "./context/auth-context";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
