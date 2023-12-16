import React, { FC } from 'react';
import { Button } from 'antd';
import { RestartAltOutlined } from '@mui/icons-material';


interface MyButtonUpdateProps {
    loading: boolean
}

const MyButtonUpdate:FC<MyButtonUpdateProps> = ({loading}) => {
  return (<>
        <Button htmlType='submit' type='primary' block loading={loading} className='flex gap-4 items-center justify-center bg-blue-500 text-lg h-10 font-semibold'>
            <span>Update</span>
            <span><RestartAltOutlined /></span>
        </Button>
  </>
    )
}

export default MyButtonUpdate