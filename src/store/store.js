import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/users/usersSlice";
import { authSlice } from "./slices/auth/authSlice";
import { interferencesSlice } from "./slices/interferences/interferencesSlice";


export const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
        auth: authSlice.reducer,   
        interferences: interferencesSlice.reducer,    
    }
});
