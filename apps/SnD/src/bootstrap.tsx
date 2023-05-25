import React from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import App from "./App";
import "./index.scss";

toast.configure({
  autoClose: 3000,
  draggable: false,
  position: "bottom-right",
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnHover: true,
});
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
