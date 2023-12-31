import { Form, Modal, Select, notification } from 'antd'
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SpecialtyCRUDUrl } from '@/Utils/Config';
import { axiosRequest } from '@/Utils/functions';
import { DataProps, LevelProps, MainSpecialtyProps, SpecialtyProps } from '@/Utils/types';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import MyButtonUpdate from '@/Designs/MyButtonUpdate';
import { useGetAllLevels } from '@/Utils/customHooks';


const { Option } = Select

interface EditSpecialtyFormProps {
  showModal: any
  setShowModal: any
  record: SpecialtyProps | null
  mainSpecialty: MainSpecialtyProps[]
  reset: any
}

const EditSpecialtyFormModal:FC<EditSpecialtyFormProps> = ({ showModal, mainSpecialty, setShowModal, reset, record }: any) => {

    const storeUserID = useSelector(selectAuthUser).id
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const [yearList, setYearList] = useState<any>();
    const [ levels, setLevels ] = useState<LevelProps[]>([])

    useGetAllLevels(setLevels, setLoading)
    
    const onSubmit = async (values: DataProps) => {
        setLoading(true)
        if (values["academic_year"] == "" || values["academic_year"] == undefined || values["academic_year"] == null){
            values["academic_year"] = record["academic_year"]
        }
        if (values["main_specialty_id"] == "" || values["main_specialty_id"] == undefined || values["main_specialty_id"] == null){
            values["main_specialty_id"] = record.main_specialty.id
        }
        const payload = {...values, updated_by_id: storeUserID}

        const response = await axiosRequest<any>({
            method: "put",
            url: SpecialtyCRUDUrl + "/" + record.id,
            payload: payload,
            hasAuth: true,
        })

        setLoading(false)
        if (response?.data.success) {
            notification.success({
                message: "Operation Successful",
                description: "Specialty Updated Successfully"
            })
            reset();
            setShowModal(false)
            form.resetFields()
        }
        else if (response?.data.error) {
            notification.error({
                message: "Operation Failed",
                // description : `${JSON.stringify(response.data.error)}`
                description : `Specialty Exist Already`
            })
        }
    }

    const thisYear = new Date().getFullYear() - 1
    useEffect(() => {
        const list = []
        for (let index = 1; index < 3; index++) {
            list.push((thisYear + index - 1) + "/" + (thisYear + index))
        }
        setYearList(list)
    }, [thisYear])

    return (
        <Modal
            title={`EDIT - ${record?.main_specialty?.specialty_name}`}
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
            destroyOnClose={true}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form} className='bg-teal-700 rounded p-2'>

                <Form.Item label="Academic Year" name="academic_year"
                    rules={[{ required: false, message: "Please Input Specialty Name" }]}
                >
                    <Select defaultValue={`${record?.academic_year}`}>
                        {yearList?.map((item: any) => <Option key={item} value={item}>{item}</Option>)}
                    </Select>                
                </Form.Item>

                <Form.Item label="Level" name="level_id"
                    rules={[{ required: false, message: "Please Input Level" }]}
                >
                    <Select defaultValue={`${record?.level?.level}`}>
                        {levels?.map((item: LevelProps) => <Option key={item.id} value={item.id}>{item.level}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item label="Main Specialty" name="main_specialty_id"
                    rules={[{ required: false, message: "Please Select Main Specialty" }]}
                >
                    <Select defaultValue={`${record?.main_specialty?.specialty_name}`}>
                        {mainSpecialty.map((ms: MainSpecialtyProps) => <Option key={ms.id} value={ms.id}>{ms.specialty_name}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <MyButtonUpdate loading={loading} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditSpecialtyFormModal;