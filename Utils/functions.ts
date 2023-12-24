// import { notification } from "antd";
import Axios, { AxiosResponse } from "axios";
import { MeUrl, UserCRUDUrl, DomainCRUDUrl, SpecialtyCRUDUrl, CourseCRUDUrl, 
    ResultRUDUrl, PermGroupsUrl, PermissionsUrl, ActivationUrl, UserProfilesUrl, MainSpecialtyCRUDUrl, MainCourseCRUDUrl, LevelCRUDUrl,
} from './Config';
import { CustomAxiosError, DataProps, UserType, ActivationProps, PermGroupsProps, PermissionsProps, 
    DomainProps,
    SpecialtyProps,
    CourseProps,
    UserProfile,
    ResultProps,
    MainSpecialtyProps,
    MainCourseProps,
    LevelProps
} from './types';


export const authHandler = async (): Promise<UserType | null> => {
    const response = await axiosRequest<UserType>({ url: MeUrl, hasAuth: true, showError: false })
    if (response) {
        return response.data
    }

    return null
}

interface AxiosRequestProps {
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'update' | 'check'
    url: string
    payload?: DataProps | FormData
    hasAuth?: boolean
    showError?: boolean
    errorObject?: {
        message: string,
        description?: string
    }
    file?: boolean
    params?: any
}


export const axiosRequest = async <T>({
    method = 'get',
    url,
    payload,
    hasAuth = false,
    showError = true,
    file = false,
    params = {},
    errorObject,
}: AxiosRequestProps): Promise<AxiosResponse<T> | null> => {
    let headers = hasAuth ? {} : {}
    if (params) {
    }
    if (file) {
        headers = { ...headers, 'content-type': 'multipart/form-data' }
    } 
    payload = {payload: payload}

    const response = await Axios({
        method,
        url,
        params: params,
        data: payload, 
        headers: { ...headers }
    }).catch(
        (e: CustomAxiosError) => {
            if (!showError) return
            return e.response
        }
    ) as AxiosResponse<T>

    if (response) {
        return response
    }

    return null
}

export const getPermGroups = async (
    setCustomGroups: (data: PermGroupsProps[]) => void,
    setFetching: (val: boolean) => void
) => {

    const response = await axiosRequest<any>({
        url: PermGroupsUrl,
        hasAuth: true,
        showError: false,
    })
    if (response) {
        const data = response.data["results"].map((item: PermGroupsProps) => ({
            ...item,
        }))
        setCustomGroups(data)
        setFetching(false)
    }
}

export const getPermissions = async (
    setCustomPermissions: (data: PermissionsProps[]) => void,
    setFetching: (val: boolean) => void
) => {

    const response = await axiosRequest<any>({
        url: PermissionsUrl,
        hasAuth: true,
        showError: false,
    })
    if (response) {
        const data = response.data["results"].map((item: PermissionsProps) => ({
            ...item,
        }))
        setCustomPermissions(data)
        setFetching(false)
    }
}

export const getActivation = async (
    setAllActivation: (data: ActivationProps) => void,
    setFetching: (val: boolean) => void
) => {

    const response = await axiosRequest<any>({
        url: ActivationUrl,
        hasAuth: true,
        showError: false,
    })
    if (response) {
        const data = response.data["results"].map((item: ActivationProps) => ({
            ...item,
            created_at: (item.created_at)?.toString().slice(0, 10),
            ending_at: (item.ending_at)?.toString().slice(0, 10) + " " + (item.ending_at)?.toString().slice(11, 16),
        }))
        setAllActivation(data[0])
        setFetching(false)
    }
}

export const getAllUsers = async (
    setAllUsers: (data: UserType[]) => void,
    setFetching: (val: boolean) => void,
    params?: { kpi?: boolean, searchField: any, value: any}
) => {

    const response = await axiosRequest<{ results: UserType[] }>({
        url: UserCRUDUrl,
        hasAuth: true,
        showError: false,
        params
    })
    if (response) {
        const data = response.data.results.map(item => ({
            ...item,
            created_at: (item.created_at)?.toString().slice(0, 10),
            last_login: (item.last_login)?.toString().slice(0, 10) + " " + (item.last_login)?.toString().slice(11, 16),
        }))
        setAllUsers(data)
        setFetching(false)
    }
}

export const getAllUserProfiles = async (
    setAllUserProfiles: (data: UserProfile[]) => void,
    setFetching: (val: boolean) => void,
    params?: { kpi?: boolean, searchField: any, value: any}
) => {

    const response = await axiosRequest<{ results: UserProfile[] }>({
        url: UserProfilesUrl,
        hasAuth: true,
        showError: false,
        params
    })
    if (response) {
        const data = response.data.results.map(item => ({
            ...item,
            created_at: (item.created_at)?.toString().slice(0, 10),
        }))
        setAllUserProfiles(data)
        setFetching(false)
    }
}


export const getAllDomains = async (
    setDomains: (data: DomainProps[]) => void,
    setFetching: (val: boolean) => void
) => {

    const response = await axiosRequest<{ results: DomainProps[] }>({
        url: DomainCRUDUrl,
        hasAuth: true,
        showError: false,
    })
    if (response) {
        setDomains(response.data.results)
        setFetching(false)
    }
}


export const getAllSpecialties = async (
    setSpecialty: (data: SpecialtyProps[]) => void,
    setFetching: (val: boolean) => void,
    params?: { searchField: string, value: string | number }
) => {

    const response = await axiosRequest<{ results: SpecialtyProps[] }>({
        url: SpecialtyCRUDUrl,
        hasAuth: true,
        showError: false,
        params
    })
    if (response) {
        setSpecialty(response.data.results)
        setFetching(false)
    }
}

export const getAllMainSpecialties = async (
    setMainSpecialty: (data: MainSpecialtyProps[]) => void,
    setFetching: (val: boolean) => void,
    params?: { searchField: string, value: string | number }
) => {

    const response = await axiosRequest<{ results: MainSpecialtyProps[] }>({
        url: MainSpecialtyCRUDUrl,
        hasAuth: true,
        showError: false,
        params
    })
    if (response) {
        setMainSpecialty(response.data.results)
        setFetching(false)
    }
}


export const getAllMainCourses = async (
    setMainSpecialty: (data: MainCourseProps[]) => void,
    setFetching: (val: boolean) => void
) => {

    const response = await axiosRequest<{ results: MainCourseProps[] }>({
        url: MainCourseCRUDUrl,
        hasAuth: true,
        showError: false,
    })
    if (response) {
        setMainSpecialty(response.data.results)
        setFetching(false)
    }
}


export const getAllCourses = async (
    setCourses: (data: CourseProps[]) => void,
    setFetching: (val: boolean) => void,
    params?: { searchField: string, value: string | number | boolean }
) => {

    const response = await axiosRequest<{ results: CourseProps[] }>({
        url: CourseCRUDUrl,
        hasAuth: true,
        showError: false,
        params
    })
    if (response) {
        setCourses(response.data.results)
        setFetching(false)
    }
}


export const getAllResults = async (
    setResults: (data: ResultProps[]) => void,
    setFetching: (val: boolean) => void,
    params?: { searchField: string, value: string | number }
) => {

    const response = await axiosRequest<{ results: ResultProps[] }>({
        url: ResultRUDUrl,
        hasAuth: true,
        showError: false,
        params
    })
    if (response) {
        setResults(response.data.results)
        setFetching(false)
    }
}


export const getAllLevels = async (
    setLevels: (data: LevelProps[]) => void,
    setFetching: (val: boolean) => void
) => {

    const response = await axiosRequest<{ results: LevelProps[] }>({
        url: LevelCRUDUrl,
        hasAuth: true,
        showError: false,
    })
    if (response) {
        setLevels(response.data.results)
        setFetching(false)
    }
}

