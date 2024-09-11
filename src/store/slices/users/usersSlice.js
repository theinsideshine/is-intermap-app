import { createSlice } from "@reduxjs/toolkit";

export const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
    admin: false,
}
const initialUserErrors = {
    username: '',
    password: '',
    email: '',
}
export const usersSlice = createSlice({

    name: 'users',
    initialState: {
        users: [],
        paginator: {},
        userSelected: initialUserForm,
        visibleForm: false,
        errors: initialUserErrors,
        isLoading: true,
    },
    reducers: {
        addUser: (state, action) => {
            state.users = [
                ...state.users,
                {
                    ...action.payload,
                }
            ];
            state.userSelected = initialUserForm;
            state.visibleForm = false;
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        updateUser: (state, action) => {
            state.users = state.users.map(u => {
                if (u.id === action.payload.id) {
                    return {
                        ...action.payload,
                    };
                }
                return u;
            });
            state.userSelected = initialUserForm;
            state.visibleForm = false;
        },
        loadingUsers: (state, { payload }) => {
            state.users = payload.content;
            state.paginator = payload;
            state.isLoading = false;
        },
        onUserSelectedForm: (state, { payload }) => {
            state.userSelected = payload;
            state.visibleForm = true;
        },
        onOpenUserForm: (state) => {
            state.visibleForm = true;
        },
        onCloseUserForm: (state) => {
            state.visibleForm = false;
            state.userSelected = initialUserForm;

        },
        loadingUserError: (state, {payload}) => {
            state.errors = payload;
        }
    }
});

export const {
    addUser,
    removeUser,
    updateUser,
    loadingUsers,
    onUserSelectedForm,
    onOpenUserForm,
    onCloseUserForm,
    loadingUserError,
} = usersSlice.actions;