import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice";
import customerReducer from "./slices/customerSlice";
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
const ticketPersistConfig = {
  key: "ticket",
  version: 1,
  storage,
};
const accountPersistedReducer = persistReducer(
  accountPersistConfig,
  accountReducer
);
const routePersistedReducer = persistReducer(routePersistConfig, routeReducer);
const ticketPersistedReducer = persistReducer(
  ticketPersistConfig,
  ticketReducer
);
export const store = configureStore({
  reducer: {
    account: accountPersistedReducer,
    customer: customerReducer,
    route: routePersistedReducer,
    search: searchReducer,
    filter: filterReducer,
    ticket: ticketPersistedReducer,
  },
});
export const persistor = persistStore(store);
setupListeners(store.dispatch);
