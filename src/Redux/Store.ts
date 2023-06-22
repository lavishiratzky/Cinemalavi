import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from './ThemeAppState';
import { moviesReducer } from './MoviesAppState';
import { ordersReducer } from './OrdersAppState';
import { usersReducer } from './UsersAppState';
import { adminsReducer } from './AdminAppState';




const rootReducer = {
    themeReducer:themeReducer,
    moviesReducer : moviesReducer,
    ordersReducer :ordersReducer,
    usersReducer: usersReducer,
    adminsReducer: adminsReducer,
};

const store = configureStore({
    reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;



export default store;