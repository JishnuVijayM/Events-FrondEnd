import { configureStore } from '@reduxjs/toolkit';
import permissionReduces from './rolePrevilages/permissionsSlice';
import tabRuducer from './tabContents/tabSlice'

export const store = configureStore({
    reducer: {
        adminPermissions: permissionReduces,
        tabContent: tabRuducer
    },
});
