import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeTab: "list",
    viewItem: {
        isView: false,
        id: ""
    },
    editItem: {
        isEdit: false,
        id: ""
    }
};

const tabSlice = createSlice({
    name: 'tabs',
    initialState,
    reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        },
        setViewedItem: (state, action) => {
            state.viewItem = {
                isView: true,
                id: action.payload
            };
        },
        clearViewedItem: (state) => {
            state.viewItem = {
                isView: false,
                id: ""
            };
        },
        setEditedItem: (state, action) => {
            state.editItem = {
                isEdit: true,
                id: action.payload
            };
        },
        clearEditedItem: (state) => {
            state.editItem = {
                isEdit: false,
                id: ""
            };
        },
    }
});

export const { setActiveTab, setViewedItem, clearViewedItem, setEditedItem, clearEditedItem } = tabSlice.actions;
export default tabSlice.reducer;
