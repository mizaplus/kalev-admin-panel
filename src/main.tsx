import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./assets/icofont/icofont.min.css";
import App from "./App.tsx";
import config from "../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import AuthProvider from "./providers/auth.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/index";

Amplify.configure(config);
const _config = Amplify.getConfig();
console.log("Amplify Config:", _config);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
