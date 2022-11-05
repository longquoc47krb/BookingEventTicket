import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice";
import searchReducer from "./slices/searchSlice";
import routeReducer from "./slices/routeSlice";
import filterReducer from "./slices/filterSlice";
import ticketReducer from "./slices/ticketSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";

const accountPersistConfig = {
  key: "account",
  version: 1,
  storage,
};
const routePersistConfig = {
  key: "route",
  version: 1,
  storage,
};
const accountPersistedReducer = persistReducer(
  accountPersistConfig,
  accountReducer
);
const routePersistedReducer = persistReducer(routePersistConfig, routeReducer);
export const store = configureStore({
  reducer: {
    account: accountPersistedReducer,
    route: routePersistedReducer,
    search: searchReducer,
    filter: filterReducer,
    ticket: ticketReducer,
  },
});
export const persistor = persistStore(store);
setupListeners(store.dispatch);
