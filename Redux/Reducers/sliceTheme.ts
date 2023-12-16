import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from "next-redux-wrapper";

const initDarkMode = true

const initialThemeState: boolean = initDarkMode;

export const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState: initialThemeState,
    reducers: {
        addDarkMode: (state, action: PayloadAction<boolean>) => {
            const darkMode = action.payload;
            return darkMode
        },
        removeDarkMode: (state, action: PayloadAction<boolean>) => {
            return initialThemeState
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                state,
                ...action.payload.darkMode
            }
        }
    }
})


export const { addDarkMode, removeDarkMode } = darkModeSlice.actions;

export const selectDarkMode = (state: AppState) => state.darkMode
// export const selectActivationColor = (state: AppState) => state.activationColor
// export const selectActivationFrequency = (state: AppState) => state.activationFrequncy

export default darkModeSlice.reducer;