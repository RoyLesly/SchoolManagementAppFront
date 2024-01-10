import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authUserSlice, userCheckSlice, userProfileSlice } from "./Reducers/sliceUser";
import { activationColorSlice, activationFrequencySlice, activationSlice } from "./Reducers/sliceActivation";
import { choosenUserProfileSlice, choosenUserSlice } from "./Reducers/sliceChoosenUserAndProfile";
import { choosenCourseSlice, choosenSpecialtySlice, choosenDomainSlice } from "./Reducers/sliceDomainSpecialityCourse";
import { darkModeSlice } from "./Reducers/sliceTheme";
import { printResultsSlice, resultsSlice } from "./Reducers/sliceResults";


const persistConfig = {
    key: 'root',
    storage,
}

const persistedDarkModeReducer = persistReducer(persistConfig, darkModeSlice.reducer)
const persistedAuthUserReducer = persistReducer(persistConfig, authUserSlice.reducer)
const persistedUserProfileReducer = persistReducer(persistConfig, userProfileSlice.reducer)

const persistedChoosenUserReducer = persistReducer(persistConfig, choosenUserSlice.reducer)
const persistedChoosenUserProfileReducer = persistReducer(persistConfig, choosenUserProfileSlice.reducer)
const persistedChoosenCourseReducer = persistReducer(persistConfig, choosenCourseSlice.reducer)
const persistedChoosenDomainReducer = persistReducer(persistConfig, choosenDomainSlice.reducer)
const persistedResultsReducer = persistReducer(persistConfig, resultsSlice.reducer)
const persistedPrintResultsReducer = persistReducer(persistConfig, printResultsSlice.reducer)


const makeStore = () => configureStore({
    reducer: {
        darkMode: darkModeSlice.reducer,
        authUser: authUserSlice.reducer,
        userProfile: userProfileSlice.reducer,
        userCheck: userCheckSlice.reducer,
        choosenUser: choosenUserSlice.reducer,
        choosenUserProfile: choosenUserProfileSlice.reducer,
        choosenCourse: persistedChoosenCourseReducer,
        choosenSpecialty: choosenSpecialtySlice.reducer,
        choosenDomain: choosenDomainSlice.reducer,
        results: resultsSlice.reducer,
        printResults: printResultsSlice.reducer,


        activation: activationSlice.reducer,
    //     activationColor: activationColorSlice.reducer,
    //     activationFrequncy: activationFrequencySlice.reducer,
    },
    devTools: process.env.NODE_ENV !== "production"
})

const store = configureStore({
    reducer: {
        darkMode: persistedDarkModeReducer,
        authUser: persistedAuthUserReducer,
        userProfile: persistedUserProfileReducer,
        userCheck: userCheckSlice.reducer,

        choosenUser: persistedChoosenUserReducer,
        choosenUserProfile: persistedChoosenUserProfileReducer,
        choosenCourse: persistedChoosenCourseReducer,
        choosenSpecialty: choosenSpecialtySlice.reducer,
        choosenDomain: choosenDomainSlice.reducer,
        results: persistedResultsReducer,
        printResults: persistedPrintResultsReducer,

        activation: activationSlice.reducer,
        activationColor: activationColorSlice.reducer,
        activationFrequncy: activationFrequencySlice.reducer,
    },
    devTools: process.env.NODE_ENV !== "production"
 })
 

export default store

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store)


// export const wrapper = createWrapper<AppStore>(makeStore)
