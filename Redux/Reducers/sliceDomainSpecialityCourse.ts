import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from "next-redux-wrapper";
import { CourseOptimizedType, DomainOptimizedType, SpecialtyOptimizedType } from '../../Utils/types';

export const initChoosenDomainOptimized = [0, ""] 

export const initChoosenSpecialtyOptimized = [0, "", "", 0, 0, 0, 0]

export const initChoosenCourseOptimized = [0, '', '', '', 0, 0, 0, false, 0, '', 0, "", "", 0, 0]


export const choosenDomainSlice = createSlice({
    name: 'choosenDomain',
    initialState: initChoosenDomainOptimized,
    reducers: {
        addChoosenDomain: (state, action: PayloadAction<DomainOptimizedType>) => {
            const domain = action.payload;
            return domain
        },
        removeChoosenDomain: () => {
            return initChoosenDomainOptimized
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.choosenDomain
            }
        }
    }
})

export const choosenSpecialtySlice = createSlice({
    name: 'choosenSpecialty',
    initialState: initChoosenSpecialtyOptimized,
    reducers: {
        addChoosenSpecialty: (state, action: PayloadAction<SpecialtyOptimizedType>) => {
            const specialty = action.payload;
            return specialty
        },
        removeChoosenSpecialty: () => {
            return initChoosenSpecialtyOptimized
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.choosenSpecialty
            }
        }
    }
})

export const choosenCourseSlice = createSlice({
    name: 'choosenCourse',
    initialState: initChoosenCourseOptimized,
    reducers: {
        addChoosenCourse: (state, action: PayloadAction<CourseOptimizedType>) => {
            const course = action.payload;
            return course
        },
        removeChoosenCourse: () => {
            return initChoosenCourseOptimized
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.choosenCourse
            }
        }
    }
})


export const { addChoosenDomain, removeChoosenDomain } = choosenDomainSlice.actions;
export const { addChoosenSpecialty, removeChoosenSpecialty } = choosenSpecialtySlice.actions;
export const { addChoosenCourse, removeChoosenCourse } = choosenCourseSlice.actions;

// export const choosenSpecialty = (state: AppState) => state.choosenSpecialty
export const choosenCourse = (state: AppState) => state.choosenCourse
export const choosenSpecialty = (state: AppState) => state.choosenSpecialty
export const choosenDomain = (state: AppState) => state.choosenDomain


export default choosenCourseSlice.reducer;