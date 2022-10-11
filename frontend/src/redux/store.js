import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice";
import eventReducer from "./slices/eventSlice";
import searchReducer from "./slices/searchSlice";
import routeReducer from "./slices/routeSlice";
import scrollReducer from "./slices/scrollSlice";
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
    event: eventReducer,
    route: routePersistedReducer,
    search: searchReducer,
    scroll: scrollReducer,
  },
});
export const persistor = persistStore(store);
setupListeners(store.dispatch);
