import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Amplify } from "aws-amplify";
import awsExports from "../amplify_outputs.json";
import AuthProvider from "./config/Auth.tsx";

Amplify.configure(awsExports);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
