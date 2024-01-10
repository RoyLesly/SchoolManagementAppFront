'use client';
import { DomainOptimizedType, DomainProps } from '@/Utils/types';
import { Table } from 'antd'
import React, { useState, useEffect, FC } from 'react'
import MyButtonView from '@/Designs/MyButtonView';
import { useDispatch } from 'react-redux';
import { addChoosenDomain, removeChoosenCourse, removeChoosenDomain, removeChoosenSpecialty } from '@/Redux/Reducers/sliceDomainSpecialityCourse';
import PageContainer from '@/app/AdministrationPages/components/container/PageContainer';
import { Box, Grid, Stack, Typography, TextField } from '@mui/material';
import MyButtonLoader from '@/Designs/MyButtonLoader';
import { getOptimizedQuery } from '@/Utils/pagination';
import { AppControlOptimizedQueryUrl } from '@/Utils/Config';


interface Page1ByDomainProps {
    setSelectedNumber: any
}

const Page1ByDomain:FC<Page1ByDomainProps> = ({ setSelectedNumber }) => {
    const dispatch = useDispatch()
    const [fetching, setFetching] = useState(true)
    const [ count, setCount ] = useState<number>(0)
    const [domains, setDomains] = useState<DomainOptimizedType[]>([])

    useEffect(() => {
        if (count == 0) {         
            getOptimizedQuery(setDomains, setFetching, ()=>{}, ()=>{}, ()=>{}, AppControlOptimizedQueryUrl, { model: "Domain", fieldList: ["id", "domain_name"]}) 
            setCount(count + 1)
        }
    }, [domains, count, dispatch])

    const reset = () => {
        getOptimizedQuery(setDomains, setFetching, ()=>{}, ()=>{}, ()=>{}, AppControlOptimizedQueryUrl, { model: "Domain", fieldList: ["id", "domain_name"]}) 
    }
  
    const COLUMNS_DOMAINS = [    
        {title: "ID", 
            render: (item: DomainOptimizedType) => <div className='italic font-semibold tracking-widest'>
                {item[0]}
            </div>
        },                       
        {title: "DOMAIN NAME", 
            render: (item: DomainOptimizedType) => <div className='italic font-semibold tracking-widest'>
                {item[1]}
            </div>
        },                       
        {title: "ACTION",
            render: (item: DomainOptimizedType) => <div onClick={() => dispatch(addChoosenDomain(item))} className='flex gap-2 italic font-semibold tracking-widest'>
                <MyButtonView setSelNum={ setSelectedNumber } nextTabNumber={"2"} />
            </div>
        },            
    ]

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
        <Box mt={2}>
            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <Stack direction="row" spacing={1} sx={{alignItems: "center",alignContent: "center"}}>
                        <Box>
                            <MyButtonLoader fetching={fetching} loadingText='Loading' info={domains.length} onClick={reset} />
                        </Box>
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <Stack direction="column">
                    <Box 
                        marginBottom={1}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography variant='h4'>ALL DOMAINS</Typography>
                    </Box>
                    <Box>
                        <Table
                            dataSource={domains}
                            columns={COLUMNS_DOMAINS}
                            pagination={false}  
                        />
                    </Box>
                    </Stack>
                </Grid>

            </Grid>
        </Box>
    </PageContainer>
  )
}

export default Page1ByDomain