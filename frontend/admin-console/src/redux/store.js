import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice";
import customerReducer from "./slices/customerSlice";
import ticketReducer from "./slices/ticketSlice";
import eventReducer from "./slices/eventSlice";
import routeReducer from "./slices/routeSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
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
const reducer = combineReducers({
  account: accountPersistedReducer,
  customer: customerReducer,
  event: eventReducer,
  ticket: ticketPersistedReducer,
  route: routePersistedReducer,
});
export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
export const persistor = persistStore(store);
setupListeners(store.dispatch);
