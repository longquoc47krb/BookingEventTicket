import { configureStore } from "@reduxjs/toolkit";
import googleReducer from "./slices/googleSlice";
import eventReducer from "./slices/eventSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
export default configureStore({
  reducer: {
    google: googleReducer,
    event: eventReducer,
  },
});
