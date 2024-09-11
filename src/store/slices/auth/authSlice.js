import { createSlice } from "@reduxjs/toolkit";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    isAdmin: false,
    isSuperUser: false,
    user: undefined,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialLogin,
    reducers: {
        onLogin: (state, action) => {
            console.log("action: ",action);
            state.isAuth = true;
            // Usar directamente los valores de isAdmin e isSuperUser proporcionados
            state.isAdmin = action.payload.isAdmin;
            state.isSuperUser = action.payload.isSuperUser;
            state.user = action.payload.user;
        },
        onLogout: (state, action) => {
            state.isAuth = false;
            state.isAdmin = false;
            state.isSuperUser = false;
            state.user = undefined;
        }
    }
});

export const { onLogin, onLogout } = authSlice.actions;

export default authSlice.reducer;
