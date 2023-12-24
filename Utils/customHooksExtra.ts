import { useEffect } from 'react';
import { getAllUsers, getAllResults, getAllUserProfiles } from "./functions"
import { UserType, ResultProps, UserProfile } from "./types"


export const useGetAllLecturers = (
    setUsers: (data: UserType[]) => void,
    setFetching: (val: boolean) => void,
) => {

    useEffect(() => {
        getAllUsers(setUsers, setFetching, { searchField: "role", value: "teacher" })
    }, [setUsers, setFetching])
}

export const useGetAllStudents = (
    setUsers: (data: UserType[]) => void,
    setFetching: (val: boolean) => void,
) => {
    useEffect(() => {
        getAllUsers(setUsers, setFetching, { searchField: ["role", "is_active"], value: ["student", true] })
    }, [setUsers, setFetching])
}

export const useGetAllUserProfilesStudents = (
    setUserProfiles: (data: UserProfile[]) => void,
    setFetching: (val: boolean) => void,
) => {

    useEffect(() => {
        getAllUserProfiles(setUserProfiles, setFetching, { searchField: "user__role", value: "student" })
    }, [setUserProfiles, setFetching])
}

export const useGetAllResultsPaid = (
    setResultsPaid: (data: ResultProps[]) => void,
    setFetching: (val: boolean) => void,
) => {
    useEffect(() => {
        getAllResults(setResultsPaid, setFetching, { searchField: "paid", value: 'true'})
    }, [setResultsPaid, setFetching])
}
