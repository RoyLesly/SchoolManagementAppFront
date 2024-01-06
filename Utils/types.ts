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
    hours: number
    completed: boolean
    assigned: boolean
    paid: boolean
    assigned_to: UserType
    date_assigned?: string
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




// KPI COUNT TYPES
export interface CustomUserCountsType {
    all_users: number
    admin_users: number
    lecturer_users: number
    student_users: number
    active_users: number
    non_active_users: number
}

export interface UserProfileCountsOneType {
    list: [
        specialty: [
            academic_year: {
                level: number
            }
        ]
    ]
    list_specialty: string[]
    academic_years: string[]
}

export interface UserProfileCountsTwoType {
    list: [
        specialty: string[]
    ]
    list_specialty: string[]
    academic_years: string[]
}



// DROPDOWN TYPES
export type DropdownDomainType = [
    id:  number,
    domain_name: number
]

export interface DropdownSpecialtyMainType {
    id:  number
    specialty_name: number
}


export type DropdownSpecialtyType = [
    id:  number,
    domain_id: number,
    specialty_name: string,
    academic_year: string,
    level: string
]

export interface DropdownCourseMainType {
    id:  number
    course_name: number
}

export interface DropdownCourseType {
    id:  number
    course_name: number
    specialty_name: string
    level: string
}

export type DropdownUserTeacherType = [
    id:  number,
    first_name: number,
    last_name: number
]



// OPTIMIZED QUERY TYPE
export type CustomUserOptimizedType = [
    id:  number,
    username: string,
    matricle: string | number,
    first_name: string,
    last_name: string,
    title: string,
    telephone: number | string,
    email: string,
    address: string,
    is_active: boolean,
    role: string,
    last_login: string,
    password: string,
    email_confirm: boolean,
]

export type UserProfileOptimizedType = [
    id:  number,
    username: string,
    matricle: string | number,
    first_name: string,
    last_name: string,
    specialty_id: number,
    specialty_name: string,
    title: string,
    telephone: number | string,
    email: string,
    address: string,
    is_active: boolean,
    role: string,
    academic_year: string,
    level: string | number,
    user_id: number,
]


export type DomainOptimizedType = [
    id:  number,
    domain_name: number
]

export type MainSpecialtyOptimizedType = [
    id:  number,
    specialty_name: number,
    domain_name: string,
    domain_id: number
]


export type SpecialtyOptimizedType = [
    id:  number,
    specialty_name: string,
    academic_year: string,
    level_id: number,
    domain_id: number,
    main_specialty_id: number,
    level: number | string,

]

export type MainCourseOptimizedType = [
    id:  number,
    course_name: string
]

export type CourseOptimizedType = [
    id:  number,
    course_name: string,
    specialty_name: string,
    semester: string | number,
    course_code: string | number,
    course_credit: number,
    hours: string,
    completed: boolean,
    level: string | number,
    academic_year: string,
    assigned_to_id: number,
    assigned_to_first_name: string,
    assigned_to_last_name: string,
    specialty_id: number,
    main_course_id: number,
]

export type LevelOptimizedType = [
    id:  number,
    level: number,
]

export interface ResultOptimizedType {
    id:  number
    course_name: number
    specialty_name: string
    level: string
}
