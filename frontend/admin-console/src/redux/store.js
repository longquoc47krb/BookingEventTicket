import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice";
import customerReducer from "./slices/customerSlice";
import ticketReducer from "./slices/ticketSlice";
import eventReducer from "./slices/eventSlice";
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
const ticketPersistedReducer = persistReducer(
  ticketPersistConfig,
  ticketReducer
);
export const store = configureStore({
  reducer: {
    account: accountPersistedReducer,
    customer: customerReducer,
    event: eventReducer,
    ticket: ticketPersistedReducer,
  },
});
export const persistor = persistStore(store);
setupListeners(store.dispatch);
