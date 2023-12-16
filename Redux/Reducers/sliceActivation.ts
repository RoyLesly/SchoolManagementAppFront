import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from "next-redux-wrapper";
import { ActivationProps, } from '../../Utils/types';

const initActivation = { 
    id: 0, code: "", status: false, valid:false, 
    // duration: 0, ending_at: "", updated_at: "", created_by: "", created_at: ""
    duration: 0, ending_at: "", updated_at: "", created_by: "", created_at: ""
}
const initActivationColor = { 
    color: "red"
}
const initActivationFrequency = { 
    hours: 6
}

const initialActivationState: ActivationProps = initActivation;
const initialActivationColorState: any = initActivationColor;
const initialActivationFrequencyState: any = initActivationFrequency;

export const activationSlice = createSlice({
    name: 'activation',
    initialState: initialActivationState,
    reducers: {
        addActivation: (state, action: PayloadAction<ActivationProps>) => {
            const activation = action.payload;
            return activation
        },
        removeActivation: (state, action: PayloadAction<ActivationProps>) => {
            return initialActivationState
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.activation
            }
        }
    }
})

export const activationColorSlice = createSlice({
    name: 'activationColor',
    initialState: initialActivationColorState,
    reducers: {
        addActivationColor: (state, action: PayloadAction<any>) => {
            const activation = action.payload;
            return activation
        },
        addActivationReminderFrequency: (state, action: PayloadAction<any>) => {
            const frequency = action.payload;
            return frequency
        },
        removeActivationColor: (state, action: PayloadAction<any>) => {
            return initialActivationColorState
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.activation
            }
        }
    }
})

export const activationFrequencySlice = createSlice({
    name: 'activationFrequency',
    initialState: initialActivationFrequencyState,
    reducers: {
        addActivationReminderFrequency: (state, action: PayloadAction<any>) => {
            const frequency = action.payload;
            return frequency
        },
        removeActivationFrequency: (state, action: PayloadAction<any>) => {
            return initialActivationFrequencyState
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.activation
            }
        }
    }
})

export const { addActivation, removeActivation } = activationSlice.actions;
export const { addActivationColor, removeActivationColor } = activationColorSlice.actions;
export const { addActivationReminderFrequency } = activationFrequencySlice.actions;

export const selectActivation = (state: AppState) => state.activation
// export const selectActivationColor = (state: AppState) => state.activationColor
// export const selectActivationFrequency = (state: AppState) => state.activationFrequncy

export default activationSlice.reducer;