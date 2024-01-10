import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { ResultOptimizedType, ResultProps } from '../../Utils/types';
import { initUserProfile } from './sliceUser';


const initialResults: ResultOptimizedType = [0, '', '', '', 0, 0, 0, false, false, false, '', 0, 0, '', '', '', '']
const initialPrintResults: ResultOptimizedType[] = [initialResults]

export const resultsSlice = createSlice({
    name: 'results',
    initialState: initialResults,
    reducers: {
        addResults: (state, action: PayloadAction<ResultOptimizedType>) => {
            const results = action.payload;
            return results
        },
        removeResults: () => {
            return initialResults
        }
    },
})


export const printResultsSlice = createSlice({
    name: 'printResults',
    initialState: initialPrintResults,
    reducers: {
        addPrintResults: (state, action: PayloadAction<ResultOptimizedType[]>) => {
            const printResult = action.payload;
            return printResult
        },
        removePrintResults: () => {
            return initialPrintResults
        }
    },
})


export const { addPrintResults, removePrintResults } = printResultsSlice.actions;

export const results = (state: AppState) => state.results
export const printResults = (state: AppState) => state.printResults

export default printResultsSlice.reducer;