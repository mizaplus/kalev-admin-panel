import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import config from "../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import AuthProvider from "./providers/auth.tsx";

Amplify.configure(config);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
