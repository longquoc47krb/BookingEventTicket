import { combineReducers } from "redux";
import googleReducer from "./googleSlice";
import eventReducer from "./eventSlice";

export default combineReducers({ googleReducer, eventReducer });
