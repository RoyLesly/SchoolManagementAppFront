import { useEffect } from 'react';
import { getAllUsers, getAllDomains,  getActivation,
    getPermGroups,
    getPermissions,
    getAllSpecialties,
    getAllCourses,
    getAllUserProfiles,
    getAllResults,
    getAllMainSpecialties,
    getAllMainCourses,
    getAllLevels,
} from "./functions"
import { UserType, DomainProps, ActivationProps, PermGroupsProps, PermissionsProps, 
    SpecialtyProps, CourseProps, UserProfile, ResultProps, MainSpecialtyProps, MainCourseProps, LevelProps, 
} from "./types"


export const useGetActivation = (
    setActivation: (data: ActivationProps) => void,
    setFetching: (val: boolean) => void,
) => {

    useEffect(() => {
        getActivation(setActivation, setFetching)
    }, [setActivation, setFetching])
}

export const useGetPermGroups = (
    setPermGroups: (data: PermGroupsProps[]) => void,
    setFetching: (val: boolean) => void,
) => {

    useEffect(() => {
        getPermGroups(setPermGroups, setFetching)
    }, [setPermGroups, setFetching])
}

export const useGetPermissions = (
    setPermissions: (data: PermissionsProps[]) => void,
    setFetching: (val: boolean) => void,
) => {

    useEffect(() => {
        getPermissions(setPermissions, setFetching)
    }, [setPermissions, setFetching])
}

export const useGetAllUsers = (
    setUsers: (data: UserType[]) => void,
    setFetching: (val: boolean) => void,
    params?: { searchField: string, value: string | number}
) => {

    useEffect(() => {
        getAllUsers(setUsers, setFetching, params)
    }, [setUsers, setFetching, params])
}

export const useGetAllUserProfiles = (
    setUserProfiles: (data: UserProfile[]) => void,
    setFetching: (val: boolean) => void,
    params?: { searchField: string, value: string | number}
) => {

    useEffect(() => {
        getAllUserProfiles(setUserProfiles, setFetching, params)
    }, [setUserProfiles, setFetching, params])
}

export const useGetAllDomains = (
    setAllDomain: (data: DomainProps[]) => void,
    setFetching: (val: boolean) => void
) => {
    useEffect(() => {
        getAllDomains(setAllDomain, setFetching)
    }, [setAllDomain, setFetching])
}

export const useGetAllSpecialties = (
    setAllSpecialties: (data: SpecialtyProps[]) => void,
    setFetching: (val: boolean) => void,
    params?: { searchField: string, value: string | number }
) => {
    useEffect(() => {
        getAllSpecialties(setAllSpecialties, setFetching, params)
    }, [setAllSpecialties, setFetching, params])
}

export const useGetAllMainSpecialties = (
    setAllMainSpecialties: (data: MainSpecialtyProps[]) => void,
    setFetching: (val: boolean) => void,
    params?: { searchField: string, value: string | number}
) => {
    useEffect(() => {
        getAllMainSpecialties(setAllMainSpecialties, setFetching, params)
    }, [setAllMainSpecialties, setFetching, params])
}

export const useGetAllCourses = (
    setAllCourses: (data: CourseProps[]) => void,
    setFetching: (val: boolean) => void,
    params?: { searchField: string, value: string | number | boolean}
) => {
    useEffect(() => {
        getAllCourses(setAllCourses, setFetching, params)
    }, [setAllCourses, setFetching, params])
}

export const useGetAllMainCourses = (
    setAllmainCourses: (data: MainCourseProps[]) => void,
    setFetching: (val: boolean) => void
) => {
    useEffect(() => {
        getAllMainCourses(setAllmainCourses, setFetching)
    }, [setAllmainCourses, setFetching])
}

export const useGetAllResults = (
    setAllResults: (data: ResultProps[]) => void,
    setFetching: (val: boolean) => void,
    params?: { searchField: string, value: string | number}
) => {
    useEffect(() => {
        getAllResults(setAllResults, setFetching, params)
    }, [setAllResults, setFetching, params])
}

export const useGetAllLevels = (
    setAllLevels: (data: LevelProps[]) => void,
    setFetching: (val: boolean) => void
) => {
    useEffect(() => {
        getAllLevels(setAllLevels, setFetching)
    }, [setAllLevels, setFetching])
}
