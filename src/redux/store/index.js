import { combineReducers } from "redux";
import userReducer from "../reducers/userReducer";
import { configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({
    user: userReducer
})

const store = configureStore({
    reducer: reducers
})

export default store