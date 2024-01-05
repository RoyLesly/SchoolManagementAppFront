import { DatePicker, Form, Input, Modal, Select, message, notification } from 'antd'
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserProfilesUrl } from '@/Utils/Config';
import { axiosRequest } from '@/Utils/functions';
import { DataProps, LevelProps, SpecialtyProps, UserProfile } from '@/Utils/types';
import MyButtonUpdate from '@/Designs/MyButtonUpdate';
import { formatDate } from '@/Utils/formulas';
import { useGetAllLevels, useGetAllSpecialties } from '@/Utils/customHooks';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';


const { Option } = Select
const { TextArea } = Input

interface EditProfileFormProps {
  showModal: any
  setShowModal: any
  record: UserProfile | null | undefined
  userRole?: string
  adminRole?: string
  reset: any
}

const EditProfileFormModal:FC<EditProfileFormProps> = ({ showModal, setShowModal, reset, record, userRole, adminRole }: any) => {
    const [specialty, setSpecialty] = useState<SpecialtyProps[]>([])
    const [specialtyData, setSpecialtyData] = useState<SpecialtyProps[]>([])
    const [levels, setLevels] = useState<LevelProps[]>([])
    const [selectedLevel, setSelectedLevel] = useState<LevelProps>()
    const [fetching, setFetching] = useState<Boolean>(false)
    const storeUser = useSelector(selectAuthUser)
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)

    useGetAllSpecialties(setSpecialty, setFetching)
    useGetAllLevels(setLevels, setFetching)
    useEffect(() => {
        setSpecialtyData(specialty)
    }, [specialty])

    console.log(specialty)

    useEffect(() => {
        const fil = levels?.filter((item: LevelProps) => item.id == record?.level?.id)
        if (fil?.length > 0){
            setSelectedLevel(fil[0])
        }
        else { setSelectedLevel(undefined) }
    }, [record, levels])

    const onSubmit = async (values: DataProps) => {

        if (values["first_name"] == undefined || values["first_name"] == "") {
            if (record["first_name"] == null) { message.error("First Name Blank !!!"); return; }
            if (record["first_name"]) { values["first_name"] = record["first_name"] }
        }
        if (values["last_name"] == undefined || values["last_name"] == "") {
            if (record["last_name"] == null) { message.error("Last Name Blank !!!"); return; }
            if (record["last_name"]) { values["last_name"] = record["last_name"] }
        }
        if (values["dob"] === undefined){
            if (record["dob"]) { values["dob"] = record["dob"] }
        }
        try { values["dob"] = formatDate(values["dob"]) } catch(err) { console.log(err)}

        if (userRole == "teacher"){
            if (values["title"] == "" || values["title"] == undefined){
                if (record["title"]) { values["title"] = record["title"] }
            }
        }

        const payload = {
            ...values, 
            user_id: record["user"]["id"], 
            role: userRole, 
            updated_by_id: storeUser.id,
            multiple: userRole == "student" ? true : false
        }

        setLoading(true)
        const response = await axiosRequest<any>({
            method: "put",
            url: UserProfilesUrl + "/" + record.id,
            payload: payload,
            hasAuth: true,
        })

        setLoading(false)
        if (response?.data.success) {
            notification.success({
                message: "Operation Successful",
                description: "Profile Updated Successfully"
            })
            reset()
            setShowModal(false)
            form.resetFields();
        }
        console.log(response?.data)
        if (response?.data.errors) {
            notification.error({
                message: "Operation Failed",
                description: `${JSON.stringify(response?.data.errors)}`
            })
        }
    }

    return (
        <Modal
            title={`EDIT - ${record?.user?.username}`}
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
            destroyOnClose={true}
        >
            <>
                <Form layout='vertical' onFinish={onSubmit} form={form} className='bg-teal-700 rounded p-2'>
                    <div className='flex w-full gap-2'>
                        <Form.Item label="First Name" name="first_name" className='w-full'
                            rules={[{ required: false, message: "Please Input First Name" }]}
                        >
                            <Input defaultValue={`${record?.first_name}`} type='text' />
                        </Form.Item>

                        <Form.Item label="Last Name" name="last_name" className='w-full'
                            rules={[{ required: false, message: "Please Input Last Name" }]}
                        >
                            <Input defaultValue={`${record?.last_name}`} type='text' />
                        </Form.Item>
                    </div>

                    <div className='flex w-full gap-2'>
                        <Form.Item label="Sex" name="sex" className='w-1/3'
                            rules={[{ required: false, message: "Please Input Sex" }]}
                        >
                            <Select defaultValue={`${record?.sex}`} >
                                <Option key="male" value="Male">Male</Option>
                                <Option key="female" value="Female">Female</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Place Of Birth" name="pob" className='w-2/3'
                            rules={[{ required: false, message: "Please Input POB" }]}
                        >
                            <Input defaultValue={`${record?.pob}`} type='text' />
                        </Form.Item>

                        <Form.Item label="Date Of Birth" name="dob" className='w-1/3'
                            rules={[{ required: false, message: "Please Input DOB" }]}
                        >
                            <DatePicker format={"YYYY-MM-DD"} placeholder={`${record?.dob}`} />
                        </Form.Item>
                    </div>

                    <div className='flex w-full gap-2'>
                        <Form.Item label="Address" name="address" className='w-2/3'
                            rules={[{ required: false, message: "Please Input Address" }]}
                        >
                            <Input defaultValue={`${record?.address}`} type='text' />
                        </Form.Item>

                        <Form.Item label="Email" name="email" className='w-2/3'
                            rules={[{ required: false, message: "Please Input Email Address" }]}
                        >
                            <Input defaultValue={`${record?.email}`} type='text' />
                        </Form.Item>
                    </div>

                    <div className='flex w-full gap-2'>
                        <Form.Item label="Telephone" name="telephone" className='w-full'
                            rules={[{ required: false, message: "Please Input Telephone" }]}
                        >
                            <Input defaultValue={`${record?.telephone}`} type='number' />
                        </Form.Item>

                        {userRole.includes("teacher") && <>
                            <Form.Item label="Title" name="title" className='w-full'
                                rules={[{ required: false, message: "Please Input Title" }]}
                            >
                                <Input defaultValue={`${record?.title}`} type='text' />
                            </Form.Item>
                        </>}
                    </div>
                    
                    {adminRole == "teacher" && <Form.Item label="IS HOD" name="hod"
                        rules={[{ required: false, message: "Please Select Level" }]}
                    >
                        <Select defaultValue={`${record?.hod ? "YES" : "NO"}`} >
                            <Option key="Yes" value={true}>YES</Option>
                            <Option key="No" value={false}>NO</Option>
                        </Select>
                    </Form.Item>}

                    {userRole.includes("teacher") && <Form.Item label="About Me" name="about" className='w-full'
                        rules={[{ required: false, message: "Please Input About" }]}
                    >
                        <TextArea defaultValue={`${record?.about}`} rows={4} className='w-full rounded'/>
                    </Form.Item>}

                    <Form.Item>
                        <MyButtonUpdate loading={loading} />
                    </Form.Item>
                </Form>
                {/* <MySnackBar 
                    message={alertMessage} 
                    show={showAlert} 
                    setShow={setShowAlert} 
                    severity={alertSeverity}
                /> */}
            </>
        </Modal>
    )
}

export default EditProfileFormModal;