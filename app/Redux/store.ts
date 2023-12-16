import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { activationColorSlice, activationFrequencySlice, activationSlice } from "./Reducers/sliceActivation";
import { choosenUserProfileSlice, choosenUserSlice } from "./Reducers/sliceUserAndProfile";
import { darkModeSlice } from "./Reducers/sliceTheme";
import { authUserSlice, userCheckSlice } from "@/Redux/Reducers/sliceUser";
import { choosenCourseSlice, choosenSpecialtySlice } from "@/Redux/Reducers/sliceDomainSpecialityCourse";


const persistConfig = {
    key: 'root',
    storage,
}

const persistedDarkModeReducer = persistReducer(persistConfig, darkModeSlice.reducer)
const persistedUserReducer = persistReducer(persistConfig, userCheckSlice.reducer)
const persistedChoosenUserReducer = persistReducer(persistConfig, choosenUserSlice.reducer)
const persistedChoosenUserProfileReducer = persistReducer(persistConfig, choosenUserProfileSlice.reducer)
const persistedChoosenCourseReducer = persistReducer(persistConfig, choosenCourseSlice.reducer)


const makeStore = () => configureStore({
    reducer: {
        darkMode: darkModeSlice.reducer,
        authUser: authUserSlice.reducer,
        userCheck: userCheckSlice.reducer,
        choosenUser: choosenUserSlice.reducer,
        choosenUserProfile: choosenUserProfileSlice.reducer,
        choosenCourse: persistedChoosenCourseReducer,
        choosenSpecialty: choosenSpecialtySlice.reducer,
        activation: activationSlice.reducer,
    //     activationColor: activationColorSlice.reducer,
    //     activationFrequncy: activationFrequencySlice.reducer,
    },
    devTools: process.env.NODE_ENV !== "production"
})

const store = configureStore({
    reducer: {
        darkMode: persistedDarkModeReducer,
        authUser: persistedUserReducer,
        userCheck: userCheckSlice.reducer,
        choosenUser: persistedChoosenUserReducer,
        choosenUserProfile: persistedChoosenUserProfileReducer,
        choosenCourse: persistedChoosenCourseReducer,
        choosenSpecialty: choosenSpecialtySlice.reducer,
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
