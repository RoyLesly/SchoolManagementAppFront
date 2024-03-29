import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from "next-redux-wrapper";
import { CustomUserOptimizedType, UserProfileOptimizedType, UserType } from '../../Utils/types';

const initChoosenUser = [0, '', '', '', '', '', '', '', '', false, '', '', '', false]

const initChoosenUserProfile = [0, '', '', '', '', 0, '', '', '', '', '', false, '', '', 0, 0]

export const initialChoosenUserState = initChoosenUser
export const initialChoosenUserProfileState = initChoosenUserProfile


export const choosenUserSlice = createSlice({
    name: 'choosedUser',
    initialState: initialChoosenUserState,
    reducers: {
        addChoosenUser: (state, action: PayloadAction<CustomUserOptimizedType>) => {
            const choosedUser = action.payload;
            return choosedUser
        },
        removeChoosenUser: () => {
            return initialChoosenUserState
        }
    },
})

export const choosenUserProfileSlice = createSlice({
    name: 'choosenUserProfile',
    initialState: initialChoosenUserProfileState,
    reducers: {
        addChoosenUserProfile: (state, action: PayloadAction<UserProfileOptimizedType>) => {
            const userProfile = action.payload;
            return userProfile
        },
        removeChoosenUserProfile: () => {
            return initialChoosenUserProfileState
        }
    },
})


export const { addChoosenUser, removeChoosenUser } = choosenUserSlice.actions;
export const { addChoosenUserProfile, removeChoosenUserProfile } = choosenUserProfileSlice.actions;

export const selectChoosenUser = (state: AppState) => state.choosenUser
export const selectChoosenUserProfile = (state: AppState) => state.choosenUserProfile

export default choosenUserSlice.reducer;