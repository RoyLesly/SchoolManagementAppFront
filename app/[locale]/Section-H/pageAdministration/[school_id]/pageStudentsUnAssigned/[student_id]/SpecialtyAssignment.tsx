'use client';
import Loader from '@/section-h/common/Loader';
import { getData } from '@/functions';
import React, { FC, useEffect, useState } from 'react'
import { GetDomainInter, GetLevelInter, GetMainSpecialtyInter, GetSpecialtyInter } from '@/NoDomain/Utils-H/appControl/appInter';
import { GetSpecialtyUrl } from '@/NoDomain/Utils-H/appControl/appConfig';


interface SpecialtyAssignmentProps {
    domain: GetDomainInter[]
    mainSpecialty: GetMainSpecialtyInter[]
    academicYear: string[]
    level: GetLevelInter[]
    onSubmitServerAction: any
    school_id: string
}
const SpecialtyAssignment: FC<SpecialtyAssignmentProps> = ({ domain, mainSpecialty, academicYear, level, onSubmitServerAction, school_id }) => {

    const [loading, setLoading] = useState<boolean>(true)
    const [count, setCount] = useState<number>(0)

    const [selDomainID, setSelDomainID] = useState<number>(0)
    const [selLevelID, setSelLevelID] = useState<number>(0)
    const [selAcademicYear, setAcademicYear] = useState<string>("")
    const [specialties, setSpecialties] = useState<GetSpecialtyInter[]>()


    useEffect(() => {
        if (count == 0) {
            if (domain && mainSpecialty && academicYear && level) { setLoading(false); }
            setCount(1);
        }
        if (count == 1 && selDomainID && selAcademicYear.length > 4 && selLevelID) {
            const GetSpecialties = async () => {
                var res = await getData(GetSpecialtyUrl, { main_specialty__field__domain__id: selDomainID, level__id: selLevelID, academic_year: selAcademicYear, school__campus__id: school_id, fieldList: [ 
                    "id", "main_specialty__specialty_name", "academic_year", "level__level" ] })
                if (res.results){ setSpecialties(res.results) }
                console.log(res)
            }
            GetSpecialties()
            setCount(2)
        }
    }, [count, selDomainID, loading, domain, selAcademicYear, mainSpecialty, level, selLevelID, academicYear, school_id])

    return (
        <div>
            {loading ? <Loader /> :
                <form className="flex flex-col gap-4 md:gap-10 p-6.5" action={onSubmitServerAction}>

                    <div className="flex flex-col">
                        <label className="block dark:text-white font-medium mb-3 text-black text-sm">
                            SELECT DOMAIN
                        </label>
                        <select
                            name="domain_id"
                            defaultValue={0}
                            onChange={(e) => { { setSelDomainID(parseInt(e.target.value)); setCount(1) } }}
                            className="active:border-primary bg-transparent border-[1.5px] border-stroke dark:bg-form-input dark:border-form-strokedark dark:focus:border-primary dark:text-white disabled:bg-whiter disabled:cursor-default focus:border-primary md:px-6 outline-none px-4 py-2 rounded-lg text-black transition w-full"
                        >
                            <option value={0} key={0}>------------------------</option>
                            {domain.map((item: GetDomainInter) => (
                                <option value={item.id} key={item.id}>{item.domain_name}</option>
                            ))}

                        </select>
                    </div>

                    {selDomainID > 0 && <div className="flex flex-col">
                        <label className="block dark:text-white font-medium mb-3 text-black text-sm">
                            SELECT ACADEMIC YEAR
                        </label>
                        <select
                            name="academic_year"
                            defaultValue={""}
                            onChange={(e) => { setAcademicYear(e.target.value); setCount(1) }}
                            className="active:border-primary bg-transparent border-[1.5px] border-stroke dark:bg-form-input dark:border-form-strokedark dark:focus:border-primary dark:text-white disabled:bg-whiter disabled:cursor-default focus:border-primary md:px-6 outline-none px-4 py-2 rounded-lg text-black transition w-full"
                        >
                            <option value={0} key={0}>------------------------</option>
                            {academicYear.map((item: string) => {
                                return (
                                    <option value={item} key={item}>{item}</option>
                                )
                            })}

                        </select>
                    </div>}

                    {selAcademicYear.length > 4 && <div className="flex flex-col">
                        <label className="block dark:text-white font-medium mb-3 text-black text-sm">
                            SELECT LEVEL
                        </label>
                        <select
                            name="level_id"
                            defaultValue={""}
                            onChange={(e) => { setSelLevelID(parseInt(e.target.value)); setCount(1) }}
                            className="active:border-primary bg-transparent border-[1.5px] border-stroke dark:bg-form-input dark:border-form-strokedark dark:focus:border-primary dark:text-white disabled:bg-whiter disabled:cursor-default focus:border-primary md:px-6 outline-none px-4 py-2 rounded-lg text-black transition w-full"
                        >
                            <option value={0} key={0}>------------------------</option>
                            {level.map((item: GetLevelInter) => {
                                return (
                                    <option value={item.id} key={item.id}>{item.level}</option>
                                )
                            })}

                        </select>
                    </div>}

                    {selDomainID && selAcademicYear.length > 4 && specialties && selLevelID && count == 2 ? <div className="flex flex-col">
                        <label className="block dark:text-white font-medium mb-3 text-black text-sm">
                            SELECT SPECIALTY
                        </label>
                        <select
                            name="specialty_id"
                            defaultValue={""}
                            className="active:border-primary bg-transparent border-[1.5px] border-stroke dark:bg-form-input dark:border-form-strokedark dark:focus:border-primary dark:text-white disabled:bg-whiter disabled:cursor-default focus:border-primary md:px-6 outline-none px-4 py-2 rounded-lg text-black transition w-full"
                        >
                            <option value={0} key={0}>------------------------</option>
                            {specialties.map((item: GetSpecialtyInter) => {
                                return (
                                <option value={item.id} key={item.id} className='flex flex-row gap-10 justify-between mt-1 px-4 w-full'>
                                    {item.main_specialty__specialty_name} - {item.academic_year} - {item.level__level}
                                </option>
                                )
                            })}

                        </select>
                    </div> : <></>}

                    {selDomainID && selLevelID && selAcademicYear.length > 4 ?
                        <button type="submit" className="bg-bluedark dark:focus:ring-primary-800 dark:hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 font-medium hover:bg-primary-700 md:text-lg mt-10 px-5 py-2.5 rounded text-center text-white tracking-widest w-full">
                            Assign
                        </button> : <></>}

                </form>}
        </div>
    )
}

export default SpecialtyAssignment