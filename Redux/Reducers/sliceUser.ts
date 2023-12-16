import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from "next-redux-wrapper";
import { AuthUser, UserProfile, UserType } from '../../Utils/types';


export const initUser = { 
    id: 0, username: '', matricle: "", first_name: "", last_name: "", role: "", 
    password: "",  address: "", about: '', sex: "", telephone: 0,
    pob: '',  dob: "", email: '', email_confirmed: false, hod: false,
    title: "", created_at: "", last_login: "", is_active: false, 
    groups: [], user_permissions: []
}

export const initAuthUser = { 
    id: 0, username: '', role: "", is_active: false,  token: "", refresh: '',
}

export const initUserProfile = { 
    id: 0, user: initUser,  created_at: "", updated_at: '',
}

const initUserCheck = {
    user_id: 0,
}

const initialAuthUserState: AuthUser = initAuthUser
const initialUserCheckState: any = initUserCheck
const initialUserProfileState: UserProfile = initUserProfile

export const authUserSlice = createSlice({
    name: 'authUser',
    initialState: initialAuthUserState,
    reducers: {
        addAuthUser: (state, action: PayloadAction<AuthUser>) => {
            const user = action.payload;
            return user
        },
        removeAuthUser: () => {
            return initialAuthUserState
        }
    },
})

export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: initialUserProfileState,
    reducers: {
        addUserProfile: (state, action: PayloadAction<UserProfile>) => {
            const userProfile = action.payload;
            return userProfile
        },
        removeUserProfile: () => {
            return initialUserProfileState
        }
    },
})

export const userCheckSlice = createSlice({
    name: 'userCheck',
    initialState: initialUserCheckState,
    reducers: {
        addUserCheck: (state, action: PayloadAction<any>) => {
            const userCheck = action.payload;
            return userCheck
        },
        removeUserCheck: () => {
            return initialUserCheckState
        }
    },
})


export const { addAuthUser, removeAuthUser } = authUserSlice.actions;
export const { addUserProfile, removeUserProfile } = userProfileSlice.actions;
export const { addUserCheck, removeUserCheck } = userCheckSlice.actions;

export const selectAuthUser = (state: AppState) => state.authUser
export const selectUserProfile = (state: AppState) => state.userProfile
export const selectUserCheck = (state: AppState) => state.userCheck

export default authUserSlice.reducer;