import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { ResultProps } from '../../Utils/types';
import { initUserProfile } from './sliceUser';
import { initChoosenCourse } from './sliceDomainSpecialityCourse';


export const initUser = { 
    id: 0, username: '', matricle: "", first_name: "", last_name: "", role: "", 
    password: "",  address: "", about: '', sex: "", telephone: 0,
    pob: '',  dob: "", email: '', email_confirmed: false, hod: false,
    title: "", created_at: "", last_login: "", is_active: false, 
    groups: [], user_permissions: []
}

export const initResults = [{
    id: 0, student: initUserProfile, course: initChoosenCourse, ca: 0,  test: 0, exam: 0, resit: 0,
    validated: false, closed: false, paid: false, created_by: initUser, updated_by: initUser,
    average: 0
}]

const initialPrintResults: ResultProps[] = initResults

export const printResultsSlice = createSlice({
    name: 'printResults',
    initialState: initialPrintResults,
    reducers: {
        addPrintResults: (state, action: PayloadAction<ResultProps[]>) => {
            const user = action.payload;
            return user
        },
        removePrintResults: () => {
            return initialPrintResults
        }
    },
})


export const { addPrintResults, removePrintResults } = printResultsSlice.actions;

export const printResults = (state: AppState) => state.printResults

export default printResultsSlice.reducer;