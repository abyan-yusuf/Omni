import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthDataProvider } from "./Apis/authContext.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <AuthDataProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthDataProvider>
);
