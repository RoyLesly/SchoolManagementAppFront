import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from "next-redux-wrapper";
import { UserProfile, UserType } from '@/Utils/types';
import { initUser, initUserProfile } from '@/Redux/Reducers/sliceUser';


const initialChoosenUserState: UserType = initUser
const initialChoosenUserProfileState: UserProfile = initUserProfile

export const choosenUserSlice = createSlice({
    name: 'choosenUser',
    initialState: initialChoosenUserState,
    reducers: {
        addChoosenUser: (state, action: PayloadAction<UserType>) => {
            const chosenUser = action.payload;
            return chosenUser
        },
        removeChoosenUser: () => {
            return initialChoosenUserState
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
    initialState: initialChoosenUserProfileState,
    reducers: {
        addChoosenUserProfile: (state, action: PayloadAction<UserProfile>) => {
            const userProfile = action.payload;
            return userProfile
        },
        removeChoosenUserProfile: () => {
            return initialChoosenUserProfileState
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