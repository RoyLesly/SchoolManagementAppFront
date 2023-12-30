'use client';
import { useGetAllDomains } from '@/Utils/customHooks';
import { DomainProps } from '@/Utils/types';
import { Table } from 'antd'
import React, { useState, useEffect, FC } from 'react'
import { getAllDomains } from '@/Utils/functions';
import FetchingDataIndicator from '@/Designs/FetchingDataIndicator';
import MyButtonView from '@/Designs/MyButtonView';
import { useDispatch } from 'react-redux';
import { addChoosenDomain } from '@/Redux/Reducers/sliceDomainSpecialityCourse';
import PageContainer from '@/app/AdministrationPages/components/container/PageContainer';
import { Box, Grid, Stack, Typography, Input, TextField } from '@mui/material';
import MyButtonLoader from '@/Designs/MyButtonLoader';


interface Page1ByDomainProps {
    setSelectedNumber: any
}

const Page1ByDomain:FC<Page1ByDomainProps> = ({ setSelectedNumber }) => {
    const dispatch = useDispatch()
    const [fetching, setFetching] = useState(true)
    const [domains, setDomains] = useState<DomainProps[]>([])
    const [domainsData, setDomainsData] = useState<DomainProps[]>([])

    useGetAllDomains(setDomains, setFetching)
    useEffect(() => {
      setDomainsData(domains)
    }, [domains])

    const reset = () => {
        getAllDomains(setDomains, setFetching)
        setFetching(true)
    }
  
    const COLUMNS_DOMAINS = [    
        {title: "DOMAIN NAME", dataIndex: "domain_name", 
            render: (item: string) => <div className='italic font-semibold tracking-widest'>
                {item}
            </div>
        },                       
        {title: "ACTION",
            render: (item: DomainProps) => <div onClick={() => dispatch(addChoosenDomain(item))} className='flex gap-2 italic font-semibold tracking-widest'>
                <MyButtonView setSelNum={ setSelectedNumber } nextTabNumber={"2"} />
            </div>
        },            
    ]

    const SearchResults = (val: string) => {
        if (val.length < 1) { setDomainsData(domains); return }
        const filterDomain = domains.filter((item: DomainProps) => item.domain_name.toLowerCase().includes(val?.toLowerCase()))
        setDomainsData(filterDomain);
    }


  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
        <Box mt={2}>
            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <Stack direction="row" spacing={2} sx={{alignItems: "center",alignContent: "center"}}>
                        <Box>
                            <MyButtonLoader fetching={fetching} loadingText='Loading' info={domainsData.length} onClick={reset} />
                        </Box>
                        <Box>            
                            {/* <div className={`bg-black rounded ${fetching ? "px-4" : ""}`}><FetchingDataIndicator fetching={fetching} /></div> */}
                            <FetchingDataIndicator fetching={fetching} />
                        </Box>
                        <Box>
                            <TextField label="Search" onChange={(e) => {SearchResults(e.target.value)}} placeholder={`Search Domains ...`} sx={{width: 260}} />
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
                        <Typography variant='h4'>DOMAINS</Typography>
                    </Box>
                    <Box>
                        <Table
                            dataSource={domainsData}
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