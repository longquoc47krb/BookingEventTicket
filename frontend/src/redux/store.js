import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice";
import eventReducer from "./slices/eventSlice";
import searchReducer from "./slices/searchSlice";
import wishlistReducer from "./slices/wishlistSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";

const eventPersistConfig = {
  key: "event",
  version: 1,
  storage,
};
const eventPersistedReducer = persistReducer(eventPersistConfig, eventReducer);
const accountPersistConfig = {
  key: "account",
  version: 1,
  storage,
};
const accountPersistedReducer = persistReducer(
  accountPersistConfig,
  accountReducer
);
export const store = configureStore({
  reducer: {
    account: accountPersistedReducer,
    event: eventReducer,
    search: searchReducer,
    wishlist: wishlistReducer,
  },
});
export const persistor = persistStore(store);
setupListeners(store.dispatch);
