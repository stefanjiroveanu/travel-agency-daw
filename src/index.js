import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import { AuthProvider } from "./context/authcontext";
import Routes from "./components/routes/routes";
import { createRoot } from "react-dom/client";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </React.StrictMode>
);
