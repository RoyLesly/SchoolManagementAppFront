import { Spin } from 'antd'
import React, { FC } from 'react'

interface FetchingDataIndicatorProps {
    fetching: boolean
}

const FetchingDataIndicator:FC<FetchingDataIndicatorProps> = ({ fetching }) => {
  return (
    <Spin spinning={fetching} />
  )
}

export default FetchingDataIndicator