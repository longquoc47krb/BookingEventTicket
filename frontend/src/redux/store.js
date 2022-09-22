import { configureStore } from "@reduxjs/toolkit";
import googleReducer from "./slices/googleSlice";
import eventReducer from "./slices/eventSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";

const eventPersistConfig = {
  key: "event",
  version: 1,
  storage,
};
const eventPersistedReducer = persistReducer(eventPersistConfig, eventReducer);
export const store = configureStore({
  reducer: {
    google: googleReducer,
    event: eventPersistedReducer,
  },
});
export const persistor = persistStore(store);
setupListeners(store.dispatch);
