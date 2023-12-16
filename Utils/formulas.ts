export const getDifferenceBetween2Arrays = (arrA: any, arrB: any) => {
    let diff = arrA.filter(((itemA: any) => !arrB.includes(itemA)))
    return diff
}

export const getIDsOfArrayOfObjects2Array = (arr: any) => {
    let idArray = arr?.map((item: any) => item.id)
    return idArray
}

export const formatDate = (val: any) => {
    return new Date(val["$d"]).toISOString().slice(0, 10)
}

export const removeDuplicate = (array: any) => {
    console.log(array);
}