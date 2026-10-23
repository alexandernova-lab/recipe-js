import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RouterApp from "./routes/RouterApp";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <AuthContextProvider>
      <RouterApp />
    </AuthContextProvider>
  </StrictMode>,
);
