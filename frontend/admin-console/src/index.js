/* eslint-disable comma-dangle */
/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.scss";
import "./locales/i18n";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
