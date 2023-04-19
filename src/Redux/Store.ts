import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from './ThemeAppState';
// import { tasksReducer } from './MovieAppState';

const rootReducer={
    themeReducer:themeReducer
    // movies:moviesr
};

const store = configureStore({
    reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;



export default store;