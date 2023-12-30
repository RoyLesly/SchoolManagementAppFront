// const thisYear = new Date().getFullYear()

export const nowYear = new Date().getUTCFullYear();
export const listOfAcademicYears = [
    (nowYear - 1) + "/" + (nowYear),
    (nowYear) + "/" + (nowYear + 1),
    (nowYear + 1) + "/" + (nowYear + 2),
]
