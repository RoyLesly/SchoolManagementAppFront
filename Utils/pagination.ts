// import { notification } from "antd";
import Axios, { AxiosResponse } from "axios";
import { MeUrl, PageUserCRUDUrl, PageCourseCRUDUrl, 
    PageResultRUDUrl, PagePermGroupsUrl, PermissionsUrl, 
    PageMainCourseCRUDUrl, PageLevelCRUDUrl,
} from './Config';
import { CustomAxiosError, DataProps, UserType, PermGroupsProps, PermissionsProps, 
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
        url: PagePermGroupsUrl,
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

export const pageGetAllUsers = async (
    setAllUsers: (data: UserType[]) => void,
    setFetching: (val: boolean) => void,
    setCount: (val: number) => void,
    setNextLink: (val: string) => void,
    setPrevLink: (val: string) => void,
    url: string,
    params?: { kpi?: boolean, searchField?: any, value?: any, page?: number},
) => {

    const response = await axiosRequest<{ url: string, count: number, results: UserType[], next: string, previous: string }>({
        url: PageUserCRUDUrl,
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
        setCount(response.data.count)
        setNextLink(response.data.next)
        setPrevLink(response.data.previous)
        setFetching(false)
    }
}

export const pageGetAllUserProfiles = async (
    setAllUserProfiles: (data: UserProfile[]) => void,
    setFetching: (val: boolean) => void,
    setCount: (val: number) => void,
    setNextLink: (val: string) => void,
    setPrevLink: (val: string) => void,
    url: string,
    params?: { kpi?: boolean, searchField?: any, value?: any, page?: number},
) => {

    const response = await axiosRequest<{ url: string, count: number, results: UserProfile[], next: string, previous: string }>({
        url: url,
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
        setCount(response.data.count)
        setNextLink(response.data.next)
        setPrevLink(response.data.previous)
        setFetching(false)
    }
}

export const pageGetAllMainSpecialties = async (
    setMainSpecialty: (data: MainSpecialtyProps[]) => void,
    setFetching: (val: boolean) => void,
    setCount: (val: number) => void,
    setNextLink: (val: string) => void,
    setPrevLink: (val: string) => void,
    url: string,
    params?: { kpi?: boolean, searchField?: any, value?: any, page?: number},
) => {

    const response = await axiosRequest<{ url: string, count: number, results: MainSpecialtyProps[], next: string, previous: string }>({
        url: url,
        hasAuth: true,
        showError: false,
        params
    })
    if (response) {
        setMainSpecialty(response.data.results)
        setCount(response.data.count)
        setNextLink(response.data.next)
        setPrevLink(response.data.previous)
        setFetching(false)    }
}

export const pageGetAllSpecialties = async (
    setSpecialty: (data: SpecialtyProps[]) => void,
    setFetching: (val: boolean) => void,
    setCount: (val: number) => void,
    setNextLink: (val: string) => void,
    setPrevLink: (val: string) => void,
    url: string,
    params?: { kpi?: boolean, searchField?: any, value?: any, page?: number},
) => {

    const response = await axiosRequest<{ url: string, count: number, results: SpecialtyProps[], next: string, previous: string }>({
        url: url,
        hasAuth: true,
        showError: false,
        params
    })
    if (response) {
        setSpecialty(response.data.results)
        setCount(response.data.count)
        setNextLink(response.data.next)
        setPrevLink(response.data.previous)
        setFetching(false)    }
}


export const pageGetAllMainCourses = async (
    setMainSpecialty: (data: MainCourseProps[]) => void,
    setFetching: (val: boolean) => void,
    setCount: (val: number) => void,
    setNextLink: (val: string) => void,
    setPrevLink: (val: string) => void,
    params?: { kpi?: boolean, searchField?: any, value?: any, page?: number},
) => {

    const response = await axiosRequest<{ count: number, results: MainCourseProps[], next: string, previous: string }>({
        url: PageMainCourseCRUDUrl,
        hasAuth: true,
        showError: false,
        params
    })
    if (response) {
        setMainSpecialty(response.data.results)
        setCount(response.data.count)
        setNextLink(response.data.next)
        setPrevLink(response.data.previous)
        setFetching(false)    }
}

export const pageGetAllCourses = async (
    setCourses: (data: CourseProps[]) => void,
    setFetching: (val: boolean) => void,
    setCount: (val: number) => void,
    setNextLink: (val: string) => void,
    setPrevLink: (val: string) => void,
    params?: { kpi?: boolean, searchField?: any, value?: any, page?: number},
) => {

const response = await axiosRequest<{ count: number, results: CourseProps[], next: string, previous: string }>({
        url: PageCourseCRUDUrl,
        hasAuth: true,
        showError: false,
        params
    })
    if (response) {
        setCourses(response.data.results)
        setCount(response.data.count)
        setNextLink(response.data.next)
        setPrevLink(response.data.previous)
        setFetching(false)    }
}

export const pageGetAllResults = async (
    setResults: (data: ResultProps[]) => void,
    setFetching: (val: boolean) => void,
    setCount: (val: number) => void,
    setNextLink: (val: string) => void,
    setPrevLink: (val: string) => void,
    params?: { kpi?: boolean, searchField?: any, value?: any, page?: number},
) => {

const response = await axiosRequest<{ count: number, results: ResultProps[], next: string, previous: string }>({
        url: PageResultRUDUrl,
        hasAuth: true,
        showError: false,
        params
    })
    if (response) {
        setResults(response.data.results)
        setCount(response.data.count)
        setNextLink(response.data.next)
        setPrevLink(response.data.previous)
        setFetching(false)    }
}

export const pageGetAllLevels = async (
    setLevels: (data: LevelProps[]) => void,
    setFetching: (val: boolean) => void,
    setCount: (val: number) => void,
    setNextLink: (val: string) => void,
    setPrevLink: (val: string) => void,
    params?: { kpi?: boolean, searchField?: any, value?: any, page?: number},
) => {

const response = await axiosRequest<{ count: number, results: LevelProps[], next: string, previous: string }>({
        url: PageLevelCRUDUrl,
        hasAuth: true,
        showError: false,
        params
    })
    if (response) {
        setLevels(response.data.results)
        setCount(response.data.count)
        setNextLink(response.data.next)
        setPrevLink(response.data.previous)
        setFetching(false)    }
}

export const getData = async (
    setData: (data: any) => void,
    setFetching: (val: boolean) => void,
    setCount: (val: number) => void,
    setNextLink: (val: string) => void,
    setPrevLink: (val: string) => void,
    url: string,
    params?: { kpi?: boolean, searchField?: any, value?: any, page?: number},
) => {

    const response = await axiosRequest<{ url: string, count: number, results: UserProfile[], next: string, previous: string }>({
        url: url,
        hasAuth: true,
        showError: false,
        params
    })
    if (response) {
        const data = response.data.results.map(item => ({
            ...item,
            created_at: (item.created_at)?.toString().slice(0, 10),
        }))
        setData(data)
        setCount(response.data.count)
        setNextLink(response.data.next)
        setPrevLink(response.data.previous)
        setFetching(false)
    }
}


export const getDataKpi = async (
    setData: (data: any) => void,
    setFetching: (val: boolean) => void,
    url: string,
    params?: { kpi?: boolean, searchField?: any, value?: any, model: string},
) => {

    const response = await axiosRequest<{ count: number }>({
        url: url,
        hasAuth: true,
        showError: false,
        params
    })
    if (response) {
        setData(response.data.count)    
        setFetching(false)
    }
}


export const getDataListKpi = async (
    setData: (data: any) => void,
    setFetching: (val: boolean) => void,
    url: string,
    params: { model: string},
) => {

    const response = await axiosRequest<{ list: number }>({
        url: url,
        hasAuth: true,
        showError: false,
        params
    })
    if (response) {
        setData(response.data.list)    
        setFetching(false)
    }
}


// OPTIMIZED QUERIES
export const getOptimizedQuery = async (
    setData: (data: any[]) => void,
    setFetching: (val: boolean) => void,
    setCount: (val: number) => void,
    setNextLink: (val: boolean) => void,
    setPrevLink: (val: boolean) => void,
    url: string,
    params?: { fieldList?: any, searchField?: any, value?: any, page?: number, model: string},
) => {

const response = await axiosRequest<{ count: number, results: any[], next: boolean, previous: boolean }>({
        url: url,
        hasAuth: true,
        showError: false,
        params
    })
    if (response) {
        setData(response.data.results)
        setCount(response.data.count)
        setNextLink(response.data.next)
        setPrevLink(response.data.previous)
        setFetching(false)    }
}