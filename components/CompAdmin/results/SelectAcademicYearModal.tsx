'use client';
import { Button, Form, Input, Modal, Select } from 'antd'
import { FC, useState, useEffect } from 'react';
import { getAllAcademicYear } from '@/Utils/functions';
import { DataProps, SpecialtyOptimizedType } from '@/Utils/types';


const { Option } = Select

interface SelectAcademicYearModalProps {
    showModal: boolean
    setShowModal: any
    setSelectedAcademicYear: any
    setCount: any
    specialties: SpecialtyOptimizedType[] | undefined
    setSpecialtyList: any
}

const SelectAcademicYearModal:FC<SelectAcademicYearModalProps> = ({ showModal, setShowModal, setSelectedAcademicYear, specialties, setSpecialtyList, setCount }: any) => {
    const [form] = Form.useForm();
    const [number, setNumber] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [academicYears, setAcademicYears] = useState<string[]>([]);
    const [academicYearsData, setAcademicYearsData] = useState<string[]>([]);


    useEffect(() => {
        if (number == 0) {
            if (showModal) {
                getAllAcademicYear(setAcademicYears, () => {});
            }
            if (academicYears.length > 0) { 
                setNumber(1); 
                setAcademicYearsData([...new Set(academicYears)].sort())
                setNumber(1)
            }
        }
    }, [specialties, number, showModal, academicYears])
    
    const onSubmit = async (values: DataProps) => {
        setCount(3)
        setShowModal(false)
        return
    }

    return (
        <Modal
            title="Academic Years"
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
        >
            {academicYearsData.length > 0 && <Form layout='vertical' onFinish={onSubmit} form={form}>
                    <Form.Item label="Select Academic year" name="domain_id"
                        rules={[{ required: true, message: "Select Academic Year" }]}
                    >
                        <Select placeholder="Select Academic Year" onSelect={(id) => {setSelectedAcademicYear(id); setShowButton(true)}}>
                            {academicYearsData && academicYearsData.sort().map((item: string) => <Option key={item} value={item}>{item}</Option>)}
                        </Select>
                    </Form.Item>

                    {showButton && <Button htmlType='submit' type='primary' block loading={loading} className='flex gap-4 items-center justify-center bg-blue-700 text-lg py-1 h-10 font-semibold'>
                        <span>Load Results</span>
                    </Button>}
                </Form>
            }
        </Modal>
    )
}

export default SelectAcademicYearModal;