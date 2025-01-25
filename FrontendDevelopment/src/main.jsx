import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Add routing to app */}
    <BrowserRouter basename={"/fabflix"}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
