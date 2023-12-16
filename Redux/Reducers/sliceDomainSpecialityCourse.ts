import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from "next-redux-wrapper";
import { CourseProps, DomainProps, SpecialtyProps } from '../../Utils/types';
import { initUser } from './sliceUser';

const initLevel = { 
    id: 0, level: 0, created_at: "", updated_at: ""
}

const initChoosenDomain = { 
    id: 0, domain_name: "", created_at: "", updated_at: ""
}

export const initChoosenSpecialty = {
    id: 0, 
    academic_year: "",
    level: initLevel,
    main_specialty: {
        specialty_name: "",
        domain: initChoosenDomain,
        id: 0,
        created_at: "",
        updated_at: ""
    }, 
    updated_at: "", created_at: ""
}

const MainCourseP = {
    course_name: "",
    id: 0,
    created_at: "",
    created_by: initUser,
    updated_at: "",
    updated_by: initUser
}

export const initChoosenCourse = {
    id: 0,
    main_course: MainCourseP,
    specialty: initChoosenSpecialty,
    course_code: "",
    course_credit: 0,
    semester: 1,
    completed: false,
    assigned: false,
    assigned_to: initUser,
    created_at: "",
    created_by: initUser,
    updated_at: "",
    updated_by: initUser
}

const initialChoosenDomainState: DomainProps = initChoosenDomain
const initialChoosenSpecialtyState: SpecialtyProps = initChoosenSpecialty
const initialChoosenCourseState: CourseProps = initChoosenCourse

export const choosenDomainSlice = createSlice({
    name: 'choosenDomain',
    initialState: initialChoosenDomainState,
    reducers: {
        addChoosenDomain: (state, action: PayloadAction<DomainProps>) => {
            const domain = action.payload;
            return domain
        },
        removeChoosenDomain: () => {
            return initialChoosenDomainState
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
    initialState: initialChoosenSpecialtyState,
    reducers: {
        addChoosenSpecialty: (state, action: PayloadAction<SpecialtyProps>) => {
            const specialty = action.payload;
            return specialty
        },
        removeChoosenSpecialty: () => {
            return initialChoosenSpecialtyState
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
    initialState: initialChoosenCourseState,
    reducers: {
        addChoosenCourse: (state, action: PayloadAction<CourseProps>) => {
            const course = action.payload;
            return course
        },
        removeChoosenCourse: () => {
            return initialChoosenCourseState
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