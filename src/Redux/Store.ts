import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from './ThemeAppState';

const rootReducer={
    themeReducer:themeReducer
};

const store = configureStore({
    reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;



export default store;