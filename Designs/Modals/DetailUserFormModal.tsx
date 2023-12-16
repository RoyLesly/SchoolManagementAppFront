import { Form, Modal, Select } from 'antd'
import { FC } from 'react';
import { UserType } from '@/Utils/types';

const { Option } = Select

interface DetailUserFormProps {
  showModal: any
  setShowModal: any
  reset: any
  record: UserType | null
}

const DetailUserFormModal:FC<DetailUserFormProps> = ({ showModal, setShowModal, reset, record }: any) => {

    const [form] = Form.useForm();

    return (
        <Modal
            title="Detail User"
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
        >
            <div>
                DETAIL USER
            </div>
        </Modal>
    )
}

export default DetailUserFormModal;