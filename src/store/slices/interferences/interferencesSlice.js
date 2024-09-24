import { createSlice } from "@reduxjs/toolkit";

// Estado inicial para un formulario de interferencias
export const initialInterferenceForm = {
    id: 0,
    username: '',
    company: '',
    address_ref: '',
    email: '',
    coord: [],
    polygon_coords: [],
    start: '',
    last: '',
    status: '',
    tolerance: 0,
    url_file: '',
};

// Estado inicial de los errores
const initialInterferenceErrors = {
    username: '',
    company: '',
    address_ref: '',
    email: '',
    coord: '',
    polygon_coords: '',
    start: '',
    last: '',
    status: '',
    tolerance: '',
    url_file: '',
};

// Crear el slice de interferencias
export const interferencesSlice = createSlice({
    name: 'interferences',
    initialState: {
        interferences: [],
        paginator: {},
        interferenceSelected: initialInterferenceForm,
        visibleForm: false,
        errors: initialInterferenceErrors,
        isLoading: true,
    },
    reducers: {
        addInterference: (state, action) => {
            state.interferences = [
                ...state.interferences,
                {
                    ...action.payload,
                }
            ];
            state.interferenceSelected = initialInterferenceForm;
            state.visibleForm = false;
        },
        removeInterference: (state, action) => {
            state.interferences = state.interferences.filter(interference => interference.id !== action.payload);
        },
        updateInterference: (state, action) => {
            state.interferences = state.interferences.map(i => {
                if (i.id === action.payload.id) {
                    return {
                        ...action.payload,
                    };
                }
                return i;
            });
            state.interferenceSelected = initialInterferenceForm;
            state.visibleForm = false;
        },
        loadingInterferences: (state, { payload }) => {
            state.interferences = payload.content;
            state.paginator = payload;
            state.isLoading = false;
        },
        onInterferenceSelectedForm: (state, { payload }) => {
            state.interferenceSelected = payload;
            state.visibleForm = true;
        },
        onOpenInterferenceForm: (state) => {
            state.visibleForm = true;
        },
        onCloseInterferenceForm: (state) => {
            state.visibleForm = false;
            state.interferenceSelected = initialInterferenceForm;
        },
        loadingInterferenceError: (state, { payload }) => {
            state.errors = payload;
        }
    }
});

export const {
    addInterference,
    removeInterference,
    updateInterference,
    loadingInterferences,
    onInterferenceSelectedForm,
    onOpenInterferenceForm,
    onCloseInterferenceForm,
    loadingInterferenceError,
} = interferencesSlice.actions;
