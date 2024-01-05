'use client';
import { Button, Form, Input, Modal, Select, notification } from 'antd'
import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CourseCRUDUrl } from '@/Utils/Config';
import { axiosRequest, getAllAcademicYear, getAllDomains, getAllSpecialties } from '@/Utils/functions';
import { DataProps, DomainProps, MainCourseProps, SpecialtyProps, UserType } from '@/Utils/types';
import MyButtonSave from '@/Designs/MyButtonSave';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import { listOfAcademicYears } from '@/Utils/constants';
import { Stack } from '@mui/material';


const { Option } = Select

interface ResultParameterSelectModalProps {
    showModal: boolean
    setShowModal: any
    showOldResult: boolean
    setShowOldResult: any
}

const ResultParameterSelectModal:FC<ResultParameterSelectModalProps> = ({ showModal, setShowOldResult, setShowModal, showOldResult, reset }: any) => {

    const storeUserID = useSelector(selectAuthUser).id
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState<number>(0);
    const [domains, setDomains] = useState<DomainProps[]>([]);
    const [selectedDomainID, setSelectedDomainID] = useState<number>(0);
    const [specialties, setSpecialties] = useState<SpecialtyProps[]>([]);
    const [academicYears, setAcademicYears] = useState<string[]>([]);


    useEffect(() => {
        if (count == 0) { 
            getAllDomains(setDomains, ()=>{});
            getAllAcademicYear(setAcademicYears, ()=>{})
            setCount(count + 1);
        }
        if (count == 1) {
            if (selectedDomainID > 0) { 
                getAllSpecialties(setSpecialties, () => {}, { searchField: "main_specialty__domain__id", value: selectedDomainID})
                setCount(count + 1)
            }
        }
    }, [count, selectedDomainID])

    
    const onSubmit = async (values: DataProps) => {
        
        console.log(values)
        setShowOldResult(true)
        setShowModal(false)
        return
        if (values["specialty_id"]){
   
            setLoading(true);

            const response = await axiosRequest<any>({
                method: "post",
                url: CourseCRUDUrl,
                payload: {...values, created_by_id: storeUserID, updated_by_id: storeUserID},
                hasAuth: true,
            })
        
            if (response?.data.success) {
                notification.success({
                    message: "Operation Successful",
                    description: "Course Added Successfully"
                })
                reset()
            }
            if (response?.data.errors) {
                notification.error({
                    message: "Operation Failed",
                    description: "Course Procedure Failed"
                })
            }
        }
        if (values["specialty_list_id"]){
            values["specialty_list_id"].forEach(async (element: any) => {
                const response = await axiosRequest<any>({
                    method: "post",
                    url: CourseCRUDUrl,
                    payload: {...values, specialty_id: element, created_by_id: storeUserID, updated_by_id: storeUserID},
                    hasAuth: true,
                })

                if (response?.data.success) {
                    notification.success({
                        message: "Operation Successful",
                        description: "Course Added Successfully"
                    });
                    reset()
                }
                if (response?.data.error) {
                    notification.error({
                        message: "Operation Failed",
                        description: JSON.stringify(response.data.error)
                    })
                }
            });
            setLoading(true)
        }
        setLoading(false)
    }

    return (
        <>
            <Modal
                title="Select Result Display Parameter"
                open={showModal}
                onCancel={() => setShowModal(false)}
                footer={false}
            >
                {showOldResult ? <>
                        <Button color='primary' onClick={() => { setShowOldResult(false); setShowModal(false); }}>
                            Show Result This Year
                        </Button>
                    </>

                    :

                    <> 
                        <Form layout='vertical' onFinish={onSubmit} form={form}>
                            <Form.Item label="Select Domain" name="domain_id"
                                rules={[{ required: true, message: "Select Domain" }]}
                            >
                                <Select placeholder="All Domains" onSelect={(id) => {setSelectedDomainID(id)}}>
                                    {domains.map((item: DomainProps) => <Option key={item.id} value={item.id}>{item?.domain_name}</Option>)}
                                </Select>
                            </Form.Item>

                            <Form.Item label="Select Academic Year" name="academic_year"
                                rules={[{ required: true, message: "Select Academic Year" }]}
                            >
                                <Select placeholder="All Courses">
                                    {academicYears?.map((item: string) => <Option key={item} value={item}>{item}</Option>)}
                                </Select>
                            </Form.Item>

                            <Form.Item label="Select Specialty" name="specialty_id"
                                rules={[{ required: true, message: "Select Specialty" }]}
                            >
                                <Select placeholder="Specialties">
                                    {specialties.map((item: SpecialtyProps) => <Option key={item.id} value={item.id}>{item?.main_specialty?.specialty_name} {item?.academic_year}</Option>)}
                                </Select>
                            </Form.Item>

                            <Form.Item>
                                <Stack direction="row" spacing={6}>
                                    <Button onClick={() => { setShowModal(false)}} loading={loading} className='flex gap-4 items-center justify-center bg-blue-700 text-lg py-1 h-10 font-semibold'>
                                        <span>Cancel</span>
                                    </Button>
                                    <Button htmlType='submit' type='primary' block loading={loading} className='flex gap-4 items-center justify-center bg-blue-700 text-lg py-1 h-10 font-semibold'>
                                        <span>Load Results</span>
                                    </Button>
                                </Stack>
                            </Form.Item>
                        </Form>
                    </> 
                }
            </Modal>

            {/* <AddCourseTransversalSelectFormModal 
                showModal={showAddTransversalCourses}
                setShowModal={setShowAddTransversalCourses}
                specialtyData={specialtyData}
                setShowMainModal={setShowModal}
                setSpecialtyList={setSpecialtyList}
                firstSelectedID={firstSelectedID}
            /> */}
        </>
    )
}

export default ResultParameterSelectModal;