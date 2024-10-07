import { createSlice } from "@reduxjs/toolkit";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    isAdmin: false,
    isSuperUser: false,
    isUser: false,
    user: undefined,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialLogin,
    reducers: {
        onLogin: (state, action) => {            
            state.isAuth = true;           
            state.isAdmin = action.payload.isAdmin;
            state.isSuperUser = action.payload.isSuperUser;
            state.isUser = action.payload.isUser;
            state.user = action.payload.user;
        },
        onLogout: (state, action) => {
            state.isAuth = false;
            state.isAdmin = false;
            state.isSuperUser = false;
            state.isUser = false;
            state.user = undefined;
        }
    }
});

export const { onLogin, onLogout } = authSlice.actions;

