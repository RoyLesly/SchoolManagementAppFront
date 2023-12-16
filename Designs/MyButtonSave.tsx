import React, { FC } from 'react';
import { Button } from 'antd';
import { Save } from '@mui/icons-material';


interface MyButtonSaveProps {
    loading: boolean
}

const MyButtonSave:FC<MyButtonSaveProps> = ({loading}) => {
  return (<>
        <Button htmlType='submit' type='primary' block loading={loading} className='flex gap-4 items-center justify-center bg-blue-700 text-lg py-1 h-10 font-semibold'>
            <span>Submit</span>
            <span><Save /></span>
        </Button>
  </>
    )
}

export default MyButtonSave