'use client';
import React from 'react';
import PageContainer from '@/app/AdministrationPages/components/container/PageContainer';
import TableProfiles from './TableProfiles';


const page = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <TableProfiles userprofiletype='student' />
    </PageContainer>
  )
}

export default page