/* eslint-disable comma-dangle */
/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.scss";
import "../node_modules/sweetalert2/src/sweetalert2.scss";
import "./locales/i18n";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import { store } from "./redux/store";
import { Provider } from "react-redux";
// import { registerLicense } from "@syncfusion/ej2-base";
// registerLicense(
//   "ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0RjXn9YdXRWRGJYV0A="
// );
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
