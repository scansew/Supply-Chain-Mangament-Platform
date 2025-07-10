/**
 * Main Entry Point
 * This is the entry point of the ScanSew application that initializes AWS Amplify
 * and renders the root App component within React's StrictMode.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// AWS Amplify Configuration
import { Amplify } from "aws-amplify";
import amplifyconfig from "./amplifyconfiguration.json";
Amplify.configure(amplifyconfig);

// Initialize React application with StrictMode for additional development checks
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
