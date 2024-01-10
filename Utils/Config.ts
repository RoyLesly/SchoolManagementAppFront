// const BaseUrl = "http://127.0.0.1:8000/";
const BaseUrl = "https://st-joan.com/back/"
// const BaseUrl = "http://172.16.10.171:8000/"
// const BaseUrl = "http://192.168.130.177:8000/"


export const AvatarLink = BaseUrl + "images/avatar.jpg";
export const LogoLink = BaseUrl + "images/stjoanlogo.jpg";
export const ActivationUrl = BaseUrl + "app/activation/activate";
export const AdminUrl = BaseUrl + "admin";
export const ExtendUrl = BaseUrl + "app/activation/extend";
export const ActivationCheckUrl = BaseUrl + "app/activation/check";

export const PermGroupsUrl = BaseUrl + "user/groups";
export const CreatePermGroupUrl = BaseUrl + "user/groups";
export const UpdatePermGroupUrl = BaseUrl + "user/groups";
export const DeletePermGroupUrl = BaseUrl + "user/groups";

export const PermissionsUrl = BaseUrl + "user/permissions";

export const LoginUrl = BaseUrl + "user/login";
export const CheckUserUrl = BaseUrl + "user/check-user";
export const MeUrl = BaseUrl + "user/me";
export const UserCRUDUrl = BaseUrl + "user/crud-user";
export const AssignGroupToUserUrl = BaseUrl + "user/assign-group-to-user";
export const AssignPermissionsToGroupUrl = BaseUrl + "user/assign-permissions-to-group";
export const CreateUpdateResetPasswordUrl = BaseUrl + "user/create-update-reset-password";
// export const ForgotPasswordUrl = BaseUrl + "user/forgot-password";
export const ForgotPasswordUrl = BaseUrl + "user/password_reset";
export const UserProfilesUrl = BaseUrl + "user/user-profiles";
export const UserProfilesStudentsUrl = BaseUrl + "user/user-profiles-students/";
export const UserProfilesLecturersUrl = BaseUrl + "user/user-profiles-lecturers/";
export const UserActivitiesUrl = BaseUrl + "user/activities-log";
 
export const DomainCRUDUrl = BaseUrl + "app/domain";
export const MainSpecialtyCRUDUrl = BaseUrl + "app/mainspecialty";
export const SpecialtyCRUDUrl = BaseUrl + "app/specialty";
export const MainCourseCRUDUrl = BaseUrl + "app/maincourse";
export const CourseCRUDUrl = BaseUrl + "app/course";
export const ResultRUDUrl = BaseUrl + "app/result";
export const LevelCRUDUrl = BaseUrl + "app/level";

export const ResultAcademicYear = BaseUrl + "app/result-academic-year";

export const ActivityCRUDUrl = BaseUrl + "app/activity-item";

// PAGINATION
export const PagePermGroupsUrl = BaseUrl + "user/page-groups";
export const PagePermissionsUrl = BaseUrl + "user/page-permissions";
export const PageUserCRUDUrl = BaseUrl + "user/page-crud-user";
export const PageActivityCRUDUrl = BaseUrl + "app/page-activity-item";
export const PageUserProfilesStudentsUrl = BaseUrl + "user/page-user-profiles-students/";
export const PageUserProfilesLecturersUrl = BaseUrl + "user/page-user-profiles-lecturers/";
export const PageUserProfilesUrl = BaseUrl + "user/page-user-profiles";

export const PageDomainCRUDUrl = BaseUrl + "app/page-domain";
export const PageMainSpecialtyCRUDUrl = BaseUrl + "app/page-mainspecialty";
export const PageSpecialtyCRUDUrl = BaseUrl + "app/page-specialty";
export const PageMainCourseCRUDUrl = BaseUrl + "app/page-maincourse";
export const PageCourseCRUDUrl = BaseUrl + "app/page-course";
export const PageResultRUDUrl = BaseUrl + "app/page-result";
export const PageLevelCRUDUrl = BaseUrl + "app/page-level";

//KPI
export const KpiUserControlUrl = BaseUrl + "user/kpi-user";
export const KpiCustomUserCountsUrl = BaseUrl + "user/kpi-custom-user-counts";
export const KpiUserProfileCountsOneUrl = BaseUrl + "user/kpi-user-profile-specialty-one-counts";
export const KpiUserProfileCountsTwoUrl = BaseUrl + "user/kpi-user-profile-specialty-two-counts";
export const KpiYearlyModelCountList = BaseUrl + "user/kpi-yearly-model-count-list";


// OPTIMIZED QUERIES
export const UserControlOptimizedQueryUrl = BaseUrl + "user/user-queries";
// OPTIMIZED QUERIES
export const AppControlOptimizedQueryUrl = BaseUrl + "app/app-queries";
export const AppControlReverseQueryUrl = BaseUrl + "app/app-reverse-queries";


export const KpiAppControlUrl = BaseUrl + "app/kpi-app";
