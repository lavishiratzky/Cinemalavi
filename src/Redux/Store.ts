import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from './ThemeAppState';
import { moviesReducer } from './MoviesAppState';




const rootReducer = {
    themeReducer:themeReducer,
    moviesReducer : moviesReducer,
};

const store = configureStore({
    reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;



export default store;