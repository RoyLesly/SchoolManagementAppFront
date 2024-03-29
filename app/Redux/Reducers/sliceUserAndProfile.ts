import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from "next-redux-wrapper";
import { CustomUserOptimizedType, UserProfile, UserProfileOptimizedType, UserType } from '@/Utils/types';
import { initUser, initUserProfile } from '@/Redux/Reducers/sliceUser';


const initialChoosenUserOptimizedState = [0, "", "", "", "", "", 0, "", "", false, "", "", "", false, "", false]
const initialChoosenUserProfileOptimizedState = [0, "", "", "", "", 0, "", "", "", "", "", false, "", "", 0, 0, 0, false]

export const choosenUserSlice = createSlice({
    name: 'choosenUser',
    initialState: initialChoosenUserOptimizedState,
    reducers: {
        addChoosenUser: (state, action: PayloadAction<CustomUserOptimizedType>) => {
            const chosenUser = action.payload;
            return chosenUser
        },
        removeChoosenUser: () => {
            return initialChoosenUserOptimizedState
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.choosenUser
            }
        }
    }
})

export const choosenUserProfileSlice = createSlice({
    name: 'choosenUserProfile',
    initialState: initialChoosenUserProfileOptimizedState,
    reducers: {
        addChoosenUserProfile: (state, action: PayloadAction<UserProfileOptimizedType>) => {
            const userProfile = action.payload;
            return userProfile
        },
        removeChoosenUserProfile: () => {
            return initialChoosenUserProfileOptimizedState
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.choosenUserProfile
            }
        }
    }
})


export const { addChoosenUser, removeChoosenUser } = choosenUserSlice.actions;
export const { addChoosenUserProfile, removeChoosenUserProfile } = choosenUserProfileSlice.actions;

export const choosenUser = (state: AppState) => state.choosenUser
export const choosenUserProfile = (state: AppState) => state.choosenUserProfile

export default choosenUserSlice.reducer;