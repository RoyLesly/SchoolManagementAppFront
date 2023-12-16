'use client';
import React from 'react'
import TableUsers from './TableUsers'
import PageContainer from '@/app/AdministrationPages/components/container/PageContainer';
import WithAuthentication from '@/app/(AuthenticationPages)/auth/WithAuthentication';


const User = () => {
  return (
    <PageContainer title="Users" description="this is Users Page">
      <TableUsers />
    </PageContainer>
  )
}

export default WithAuthentication(User);