import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    status : false,
    userData : null
}

export let authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {

        Login : (state,action)=>{
            state.status = true;
            state.userData = action.payload;
        },

        Logout : (state)=>{
            state.status = false;
            state.userData = null;
        }
    }
})

export let {Login,Logout} = authSlice.actions;

export default authSlice.reducer;

