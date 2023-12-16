'use client';
import { Form, Modal, Select, notification } from 'antd'
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { CourseCRUDUrl } from '@/Utils/Config';
import { axiosRequest } from '@/Utils/functions';
import { DataProps, SpecialtyProps } from '@/Utils/types';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import MyButtonSave from '@/Designs/MyButtonSave';


interface AddCourseTransversalSelectFormModalProps {
  showModal: any
  setShowModal: any
  specialtyData: SpecialtyProps[]
  setShowMainModal: any
  setSpecialtyList: any
  firstSelectedID: number
}

const AddCourseTransversalSelectFormModal:FC<AddCourseTransversalSelectFormModalProps> = ({ showModal, setShowModal, firstSelectedID, specialtyData, setShowMainModal, setSpecialtyList }: any) => {
    const storeUserID = useSelector(selectAuthUser).id
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    
    const onSubmit = async (values: DataProps) => {
        setLoading(true)
        values["assigned"] = false
        if (values["assigned_to_id"]){
            values["assigned"] = true
        }

        const response = await axiosRequest<any>({
            method: "post",
            url: CourseCRUDUrl,
            payload: {...values, created_by_id: storeUserID, updated_by_id: storeUserID},
            hasAuth: true,
        })

        setLoading(false)
        if (response?.data.success) {
            notification.success({
                message: "Operation Successful",
                description: "Course Added Successfully"
            })
            setShowModal(false);
            setShowMainModal(false);
        }
        if (response?.data.errors) {
            notification.error({
                message: "Operation Failed",
                description: "Course Procedure Failed"
            })
        }
    }

    const thisYear = new Date().getFullYear() - 1

    return (
        <Modal
            title="Assign Course"
            open={showModal}
            onCancel={() => { setShowModal(false); setShowMainModal(true) }}
            footer={false}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form}>

                <Form.Item label="All Specialties" name="specialties"
                    rules={[{ required: true, message: "Please Select Specialties" }]}
                >
                    <Select 
                        placeholder="Select Specialties"
                        mode="multiple"
                        defaultValue={[firstSelectedID]}
                        style={{ width: '100%' }}
                        onChange={(e) => { console.log(e) }}
                        options={specialtyData.map(function(elem: SpecialtyProps) {
                            return {
                              label: elem?.main_specialty?.specialty_name + "-" + elem?.level?.level  + " " + elem?.academic_year ,
                              value: elem?.id,
                            }}) 
                          } 
                    />
                </Form.Item>

                <Form.Item>
                    <MyButtonSave loading={loading} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddCourseTransversalSelectFormModal;