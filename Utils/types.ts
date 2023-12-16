import { AxiosError } from "axios"
import React from "react"


export interface DataProps {
    [key: string]: string | boolean | number | null | any | React.ReactElement
}

export interface CustomAxiosError extends Omit<AxiosError, 'response'> {
    response?: {
        data: { 
            error: string,
            name?: string
        }
    }
}

export interface FieldProps {
    id: number, item: string, ca: number, exam: number, resit: number
}

export interface AuthTokenType {
    Authorization: string
}

export interface ActivationProps {
    code: string
    duration: number
    valid: boolean
    status: boolean
    ending_at: string
    created_by: any
    created_at: string
}

export interface ContentTypeProps {
    id: string
    app_label: string
    model: string
}

export interface PermissionsProps {
    id: number
    name: string
    codename: string
    content_type: ContentTypeProps
    model: string
}

export interface PermGroupsProps {
    id: number
    name: string
    // permissions: []
    permissions: PermissionsProps[]
}


export interface UserType {
    id: number
    username: string
    matricle: string
    first_name: string
    last_name: string
    role: string
    password?: string
    address?: string
    about: string
    sex: string
    telephone: number
    pob: string
    dob: string
    email: string
    email_confirmed: boolean
    hod?: boolean
    title?: string
    created_at: string
    last_login: string
    is_active: boolean
    groups?: PermGroupsProps[]
    user_permissions?: PermissionsProps[]
}

export interface AuthUser {
    id: number
    username: string
    role: string
    is_active: boolean
    token: string
    refresh: string
}


export interface LevelProps {
    id: number
    level: number
    created_at?: string
    created_by?: UserType
    updated_at?: string
    updated_by?: UserType
}


export interface UserProfile {
    id: number,
    user: UserType
    specialty?: SpecialtyProps
    created_at: string
    updated_at: string
}


export interface DomainProps {
    domain_name: string
    id: number
    created_at: string
    updated_at: string
}


export interface MainSpecialtyProps {
    specialty_name: string
    domain: DomainProps
    id: number
    created_at: string
    updated_at: string
}


export interface SpecialtyProps {
    main_specialty: MainSpecialtyProps
    academic_year: string
    level: LevelProps
    id: number
    created_at: string
    updated_at: string
}


export interface MainCourseProps {
    course_name: string
    id: number
    created_at: string
    created_by: UserType
    updated_at: string
    updated_by: UserType
}


export interface CourseProps {
    id: number
    main_course: MainCourseProps
    specialty: SpecialtyProps
    semester: string | number
    course_code: string
    course_credit: number
    completed: boolean
    assigned: boolean
    assigned_to: UserType
    created_at: string
    created_by: UserType
    updated_at: string
    updated_by: UserType
}


export interface ResultProps {
    id: number
    course: CourseProps
    student: UserProfile
    ca: number
    test?: number
    exam: number | any
    resit: number
    average: number
    validated?: boolean
    closed?: boolean
    paid?: boolean
    created_at?: string
    created_by?: UserType
    updated_at?: string
    updated_by?: UserType
}
