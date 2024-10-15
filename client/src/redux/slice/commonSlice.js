import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    currentUser: null,
    selectedChat: {},
    chats: [],
    isNewGroupModalOpen : false,
}

const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        showLoader: (state, action) => {
            state.loading = action.payload;
        },
        currentUserAuth: (state, action) => {
            state.currentUser = action.payload;
        },
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
        },
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setIsNewGroupModalOpen: (state, action) => {
            state.isNewGroupModalOpen = action.payload;
        },
    },
})

export const { showLoader, currentUserAuth, setSelectedChat, setChats,setIsNewGroupModalOpen } = commonSlice.actions;

export default commonSlice.reducer;