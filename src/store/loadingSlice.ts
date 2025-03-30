import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    loading: false
    
};

export const loadingSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        loadingToggle(state) {
 
            state.loading = !state.loading;
        },

    },
});

export const { loadingToggle } = loadingSlice.actions;

