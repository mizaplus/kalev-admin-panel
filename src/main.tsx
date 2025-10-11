// Utils
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// App Root
import App from "./App.tsx";

// Styles
import "./index.css";
import "@aws-amplify/ui-react/styles.css";
import AuthProvider from "./providers/auth.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
