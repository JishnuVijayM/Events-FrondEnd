import { configureStore } from '@reduxjs/toolkit';
import permissionReduces from './rolePrevilages/permissionsSlice';

export const store = configureStore({
    reducer: {
        adminPermissions: permissionReduces,
    },
});
