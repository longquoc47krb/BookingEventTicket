import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import accountReducer from "./slices/accountSlice";
import categoryReducer from "./slices/categorySlice";
import eventReducer from "./slices/eventSlice";
import routeReducer from "./slices/routeSlice";

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
const reducer = combineReducers({
  account: accountPersistedReducer,
  event: eventReducer,
  route: routePersistedReducer,
  category: categoryReducer,
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
