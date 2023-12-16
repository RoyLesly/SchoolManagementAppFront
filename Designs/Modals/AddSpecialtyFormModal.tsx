import { Form, Modal, Select, message, notification } from 'antd'
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SpecialtyCRUDUrl } from '@/Utils/Config';
import { axiosRequest } from '@/Utils/functions';
import { DataProps, LevelProps, MainSpecialtyProps } from '@/Utils/types';
import MyButtonSave from '@/Designs/MyButtonSave';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';


const { Option } = Select

interface AddSpecialtyUserFormProps {
  showModal: any
  setShowModal: any
  mainSpecialty: MainSpecialtyProps[]
  levels: LevelProps[]
  reset: any
}

const AddSpecialtyFormModal:FC<AddSpecialtyUserFormProps> = ({ showModal, mainSpecialty, setShowModal, reset, levels }: any) => {

    const storeUser = useSelector(selectAuthUser);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [yearList, setYearList] = useState<any>();

    const onSubmit = async (values: DataProps) => {
        setLoading(true)
        if (values["level_list_id"]){
            values["level_list_id"].forEach(async (element: any) => {
                const response = await axiosRequest<any>({
                    method: "post",
                    url: SpecialtyCRUDUrl,
                    payload: {...values, level_id: element, created_by_id: storeUser.id, updated_by_id: storeUser.id},
                    hasAuth: true,
                })
                console.log(response)

                if (response?.data.success) {
                    notification.success({
                        message: "Operation Successful",
                        description: "Specialty Added Successfully"
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
        }
        else { 
            message.error("Select Levels") 
        }
        setLoading(false)
    }

    const thisYear = new Date().getFullYear()
    useEffect(() => {
        const list = []
        for (let index = 1; index < 3; index++) {
            list.push((thisYear + index - 1) + "/" + (thisYear + index))
        }
        setYearList(list)
    }, [thisYear])

    return (
        <Modal
            title="Create New Class"
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form}>

                <Form.Item label="MAIN SPECIALTY" name="main_specialty_id"
                    rules={[{ required: true, message: "Please Input Main Specialty" }]}
                >
                    <Select>
                        {mainSpecialty.map((dom: MainSpecialtyProps) => <Option key={dom.id} value={dom.id}>{dom.specialty_name}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item label="Academic Year" name="academic_year"
                    rules={[{ required: true, message: "Please Input Academic year" }]}
                >
                    <Select>
                        {yearList?.map((item: any) => <Option key={item} value={item}>{item}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item label="Level" name="level_list_id" className='w-full bg-red-300 rounded'>
                    <Select 
                        className='bg-red-300'
                        placeholder="Select Specialties"
                        mode="multiple"
                        defaultValue={[]}
                        style={{ width: '100%' }}
                        // onChange={(e) => { console.log(e) }}
                        options={levels.map(function(elem: LevelProps) {
                            return {
                                label: "Level - " + elem?.level,
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

export default AddSpecialtyFormModal;