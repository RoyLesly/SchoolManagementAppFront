import { Form, Input, Modal, Select, message, notification } from 'antd'
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserProfilesUrl } from '@/Utils/Config';
import { axiosRequest } from '@/Utils/functions';
import { DataProps, SpecialtyProps, UserProfile } from '@/Utils/types';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import MyButtonUpdate from '@/Designs/MyButtonUpdate';
import { useGetAllSpecialties } from '@/Utils/customHooks';


const { Option } = Select

interface EditStudentLevelFormProps {
  showModal: any
  setShowModal: any
  record: UserProfile | null | undefined
  userRole?: string
  adminRole?: string
  reset: any
}

const EditStudentLevelFormModal:FC<EditStudentLevelFormProps> = ({ showModal, setShowModal, reset, record, userRole, adminRole }: any) => {

    const [specialty, setSpecialty] = useState<SpecialtyProps[]>([])
    const [specialtyData, setSpecialtyData] = useState<SpecialtyProps[]>([])
    const [fetching, setFetching] = useState<Boolean>(false)
    const storeUserID = useSelector(selectAuthUser).id
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)

    useGetAllSpecialties(setSpecialty, setFetching)
    useEffect(() => {
        // const filA = specialty.filter((item: SpecialtyProps) => item?.main_specialty?.specialty_name == record?.specialty?.main_specialty?.specialty_name)
        const filA = specialty.filter((item: SpecialtyProps) => item?.level.id > record?.specialty?.level.id)
        const filB = filA.filter((item: SpecialtyProps) => item?.academic_year > record?.specialty?.academic_year)
        setSpecialtyData(filB)
    }, [record, specialty])

    const onSubmit = async (values: DataProps) => {
        if (record["specialty"] == null){
            message.error("Student Not Belong To Specialty"); return;
        }

        const payload = {
            ...record, 
            user_id: record["user"]["id"], 
            role: userRole, 
            specialty_id: values["specialty_id"], 
            created_by_id: storeUserID
        }
        console.log(payload)
        // return

        setLoading(true)
        const response = await axiosRequest<any>({
            method: "post",
            url: UserProfilesUrl,
            payload: payload,
            hasAuth: true,
        })

        setLoading(false)
        if (response?.data.success) {
            notification.success({
                message: "Operation Successful",
                description: "Promoted Successfully"
            })
            reset()
            setShowModal(false)
            form.resetFields();
        }
        if (response?.data.errors) {
            notification.error({
                message: "Operation Failed",
                description: "Promoted Failed"
            })
        }
    }

    return (
        <Modal
            title={`PROMOTE - ${record?.user?.username}`}
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form} className='bg-teal-700 rounded p-2'>

                <div className='flex w-full gap-2'>
                    <Form.Item label="PRESENT LEVEL" name="level" className='w-full'
                        rules={[{ required: false, message: "Please Input LEVEL" }]}
                    >
                        <Input placeholder={`${record?.specialty ? `${record?.specialty?.main_specialty.specialty_name } - L${record?.specialty?.level?.level }-${record?.specialty?.academic_year}`: "None"}`} type='text' disabled />
                    </Form.Item>
                </div>

                <div className='text-4xl text-center font-bold tracking-widest mb-10'>To</div>
                
                <div className='text-center items-center justify-center text-4xl font-bold tracking-widest mb-10'>LEVEL {record?.specialty ? <>{record?.specialty?.level.level + 1} OR {record?.specialty?.level.level + 2}</> : "None"}</div>

                {adminRole == "admin" && <>
                    <Form.Item label="" name="specialty_id" className=''
                        rules={[{ required: true, message: "Please Select Specialty" }]}
                    >
                        <Select placeholder={`${record?.specialty ? `${record?.specialty?.main_specialty.specialty_name } - L${record?.specialty?.level?.level }-${record?.specialty?.academic_year}` : "None"}`}>
                            {specialtyData.map((item: SpecialtyProps) => (
                                <Option key={item.id} value={item.id}>{item?.main_specialty.specialty_name} - L{item?.level?.level} - {item?.academic_year}</Option>
                            ))}                            
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <MyButtonUpdate loading={loading} />
                    </Form.Item></>
                }


            </Form>
        </Modal>
    )
}

export default EditStudentLevelFormModal;