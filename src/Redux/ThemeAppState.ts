import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Theme } from '../Models/Themes';

interface ThemeState{
    theme: Theme;
}
const initialState: ThemeState = {
    theme: 'light-mode'
};
export enum ActionType {
    TOGGLE_THEME = 'TOGGLE_THEME',
};
const themeSlice =createSlice({
    name:"theme",
    initialState,
    reducers: {
        toggleTheme(state, action: PayloadAction<Theme>) {
          state.theme = action.payload;
        },
    },

});

export const{
    
    toggleTheme,
} =themeSlice.actions

export const themeReducer=themeSlice.reducer;