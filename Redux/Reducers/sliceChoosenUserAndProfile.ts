import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from "next-redux-wrapper";
import { UserProfile, UserType } from '../../Utils/types';

const initChoosenUser = { 
    id: 0, username: '', role: "", first_name: "", last_name: "", created_at: "", 
    last_login: "", is_active: false, dept: null, matricle: "", about: "", sex: "",
    telephone: 0, pob: "", dob: "", email: "", email_confirmed: false,
}

const initChoosenUserProfile = {
    id: 0, user: initChoosenUser, first_name: "", last_name: "", about: "", telephone: 0, sex: "",
    pob: "", dob: "", email: "", title: "", updated_at: "", created_at: "", email_confirmed: false,
}

export const initialChoosenUserState: UserType = initChoosenUser
export const initialChoosenUserProfileState: UserProfile = initChoosenUserProfile


export const choosenUserSlice = createSlice({
    name: 'choosedUser',
    initialState: initialChoosenUserState,
    reducers: {
        addChoosenUser: (state, action: PayloadAction<UserType>) => {
            const choosedUser = action.payload;
            return choosedUser
        },
        removeChoosenUser: () => {
            return initialChoosenUserState
        }
    },
})

export const choosenUserProfileSlice = createSlice({
    name: 'choosedUserProfile',
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
})


export const { addChoosenUser, removeChoosenUser } = choosenUserSlice.actions;
export const { addChoosenUserProfile, removeChoosenUserProfile } = choosenUserProfileSlice.actions;

export const selectChoosenUser = (state: AppState) => state.choosenUser
export const selectChoosenUserProfile = (state: AppState) => state.choosenUserProfile

export default choosenUserSlice.reducer;