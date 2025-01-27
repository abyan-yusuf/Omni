import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthDataProvider } from "./Apis/authContext.jsx";
import { CartDataProvider } from "./Apis/cartContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthDataProvider>
    <CartDataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartDataProvider>
  </AuthDataProvider>
);
