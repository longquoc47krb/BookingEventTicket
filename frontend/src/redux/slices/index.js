import { combineReducers } from "redux";
import googleReducer from "./accountSlice";
import eventReducer from "./eventSlice";

export default combineReducers({ googleReducer, eventReducer });
