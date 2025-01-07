import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    roleId: "",
    permissions: []
};

const permissionsSlice = createSlice({
    name: 'permissions',
    initialState,
    reducers: {
        setRoleId: (state, action) => {
            state.roleId = action.payload;
        },
        clearRoleId: (state) => {
            state.roleId = ""
        },
        handleAddPermissions: (state, action) => {
            // state.permissions.push(action.payload)
            state.permissions = [action.payload]
        },
        handleClearPermission: (state) => {
            state.permissions = []
        }
    },
});

export const { setRoleId, clearRoleId, handleAddPermissions, handleClearPermission } = permissionsSlice.actions;
export default permissionsSlice.reducer;
