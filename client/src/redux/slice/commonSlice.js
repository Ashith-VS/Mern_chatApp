import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isloading: false,
    currentUser: null,
}

const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        showLoader: (state, action) => {
            state.isloading = action.payload;
        },
        currentUserAuth: (state, action) => {
            state.currentUser = action.payload;
        },
    },
})

export const { showLoader, currentUserAuth } = commonSlice.actions;

export default commonSlice.reducer;