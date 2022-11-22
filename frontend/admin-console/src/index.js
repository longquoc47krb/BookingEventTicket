/* eslint-disable comma-dangle */
/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "../node_modules/sweetalert2/src/sweetalert2.scss";
import "./locales/i18n";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ContextProvider>
          <App />
        </ContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
