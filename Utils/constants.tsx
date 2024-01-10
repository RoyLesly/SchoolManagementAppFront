// const thisYear = new Date().getFullYear()

export const nowYear = new Date().getUTCFullYear();
export const nowMonth = new Date().getUTCMonth()
export const listOfAcademicYears = [
    (nowYear - 1) + "/" + (nowYear),
    (nowYear) + "/" + (nowYear + 1),
    (nowYear + 1) + "/" + (nowYear + 2),
]
export const currentAcademicYear = () => {
    if ((nowMonth + 1) > 8) {
        return (nowYear) + "/" + (nowYear + 1)
    } else {
        return (nowYear - 1) + "/" + (nowYear)
    }
}

export const CustomUserFieldList = [
    "id", 
    "username", 
    "matricle", 
    "first_name", 
    "last_name",
    "title", 
    "telephone", 
    "email", 
    "address", 
    "is_active", 
    "role",
    "last_login",
    "password",
    "email_confirmed",
    "sex",
    "hod",
]

export const UserProfileFieldList = [
    "id", 
    "user__username", 
    "user__matricle", 
    "user__first_name", 
    "user__last_name", 
    "specialty__id", 
    "specialty__main_specialty__specialty_name", 
    "user__title", "user__telephone", 
    "user__email", 
    "user__address",
    "user__is_active", 
    "user__role", "specialty__academic_year", 
    "specialty__level__level", "user__id", 
    "specialty__main_specialty__domain__id"
]

export const SpecialtyFieldList = [
    "id", 
    "main_specialty__specialty_name", 
    "academic_year", 
    "level__id", 
    "main_specialty__domain__id", 
    "main_specialty__id", 
    "level__level", 
]

export const CourseFieldList = [
    "id", 
    "main_course__course_name", 
    "specialty__main_specialty__specialty_name", 
    "specialty__academic_year", 
    "specialty__level__level", 
    "course_code", 
    "course_type", 
    "semester", 
    "course_credit", 
    "completed", 
    "assigned", 
    "paid", 
    "hours", 
    "assigned_to__first_name", 
    "assigned_to__last_name", 
    "assigned_to__id", 
    "specialty__main_specialty__id", 
    "date_assigned", 
]

export const ResultFieldList = [
    "id", 
    "course__main_course__course_name",
    "student__user__first_name",
    "student__user__last_name",
    "ca", 
    "exam",
    "resit",
    "validated",
    "closed",
    "paid",
    "updated_by__first_name",
    "student__id",
    "course__id",
    "course__specialty__academic_year",
    "updated_at",
    "student__specialty__id",
    "course__main_course__course_name",
]
