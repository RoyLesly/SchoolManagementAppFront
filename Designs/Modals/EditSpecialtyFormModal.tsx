import { Form, Modal, Select, notification } from 'antd'
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SpecialtyCRUDUrl } from '@/Utils/Config';
import { axiosRequest } from '@/Utils/functions';
import { DataProps, LevelOptimizedType, LevelProps, MainSpecialtyOptimizedType, MainSpecialtyProps, SpecialtyOptimizedType, SpecialtyProps } from '@/Utils/types';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import MyButtonUpdate from '@/Designs/MyButtonUpdate';


const { Option } = Select

interface EditSpecialtyFormProps {
  showModal: any
  setShowModal: any
  record: SpecialtyOptimizedType | undefined
  mainSpecialty: MainSpecialtyOptimizedType[]
  reset: any
  levels: LevelOptimizedType[]
}

const EditSpecialtyFormModal:FC<EditSpecialtyFormProps> = ({ showModal, mainSpecialty, setShowModal, reset, record, levels }: any) => {

    const storeUserID = useSelector(selectAuthUser).id
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const [yearList, setYearList] = useState<any>();
    
    const onSubmit = async (values: DataProps) => {
        setLoading(true)
        if (values["academic_year"] == "" || values["academic_year"] == undefined || values["academic_year"] == null){
            values["academic_year"] = record[2]
        }
        if (values["main_specialty_id"] == "" || values["main_specialty_id"] == undefined || values["main_specialty_id"] == null){
            values["main_specialty_id"] = record[5]
        }
        const payload = {...values, updated_by_id: storeUserID}

        const response = await axiosRequest<any>({
            method: "put",
            url: SpecialtyCRUDUrl + "/" + record[0],
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
        else if (response?.data.errors) {
            notification.error({
                message: "Operation Failed",
                description : JSON.stringify(response.data.errors)
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
            title={`EDIT - ${record && record[1]}`}
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
            destroyOnClose={true}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form} className='bg-teal-700 rounded p-2'>

                <Form.Item label="Academic Year" name="academic_year"
                    rules={[{ required: false, message: "Please Input Specialty Name" }]}
                >
                    <Select defaultValue={`${record && record[2]}`}>
                        {yearList?.map((item: any) => <Option key={item} value={item}>{item}</Option>)}
                    </Select>                
                </Form.Item>

                <Form.Item label="Level" name="level_id"
                    rules={[{ required: false, message: "Please Input Level" }]}
                >
                    <Select defaultValue={`${record && record[3]}`}>
                        {levels?.map((item: LevelOptimizedType) => <Option key={item[0]} value={item[0]}>{item[1]}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item label="Main Specialty" name="main_specialty_id"
                    rules={[{ required: false, message: "Please Select Main Specialty" }]}
                >
                    <Select defaultValue={`${record && record[1]}`}>
                        {mainSpecialty.map((ms: MainSpecialtyOptimizedType) => <Option key={ms[0]} value={ms[0]}>{ms[1]}</Option>)}
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