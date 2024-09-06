import { configureStore } from "@reduxjs/toolkit";
import authSlice  from "./authSlice";

let store = configureStore({
    reducer : authSlice
})

export default store;