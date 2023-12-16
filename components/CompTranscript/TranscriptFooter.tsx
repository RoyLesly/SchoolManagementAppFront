'use client'
import { Box, Grid, Paper, Typography, styled } from '@mui/material'
import React from 'react';

const Item = styled(Typography)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0.3),
    textAlign: "left",
    fontSize: 10,
}))

const TranscriptFooter = () => {
  return (
    <Box alignSelf="end" display="flex" justifyContent="space-between" p={0} m={0}>
        <Grid container spacing={0}>
            <Grid xs={8}>
                <Box textAlign="center">
                    <Typography sx={{ fontSize: 10,  }}>Grade System Classification</Typography>
                </Box>
                <Box display="flex" justifyContent="space-around">
                    <Grid container direction="column" spacing={0} xs={1}>
                        <Grid item p={0} my={0}><Item>Grade</Item></Grid>
                        <Grid item p={0} my={-1}><Item>A</Item></Grid>
                        <Grid item p={0} my={0}><Item>B+</Item></Grid>
                        <Grid item p={0} my={-1}><Item>B</Item></Grid>
                        <Grid item p={0} my={0}><Item>C+</Item></Grid>
                        <Grid item p={0} my={-1}><Item>C</Item></Grid>
                        <Grid item p={0} my={0}><Item>D+</Item></Grid>
                        <Grid item p={0} my={-1}><Item>D</Item></Grid>
                        <Grid item p={0} my={0}><Item>F</Item></Grid>
                    </Grid>
                    <Grid container direction="column" spacing={0} xs={1.4}>
                        <Grid item p={0} my={0}><Item>Mark</Item></Grid>
                        <Grid item p={0} my={-1}><Item>{`> 80`}</Item></Grid>
                        <Grid item p={0} my={0}><Item>70 -79</Item></Grid>
                        <Grid item p={0} my={-1}><Item>60 -69</Item></Grid>
                        <Grid item p={0} my={0}><Item>55 -59</Item></Grid>
                        <Grid item p={0} my={-1}><Item>50 -54</Item></Grid>
                        <Grid item p={0} my={0}><Item>45 - 49</Item></Grid>
                        <Grid item p={0} my={-1}><Item>40 -44</Item></Grid>
                        <Grid item p={0} my={0}><Item>{`< 44`}</Item></Grid>
                    </Grid>
                    <Grid container direction="column" spacing={0} xs={0.8}>
                        <Grid item p={0} my={0}><Item>GP</Item></Grid>
                        <Grid item p={0} my={-1}><Item>4.0</Item></Grid>
                        <Grid item p={0} my={0}><Item>3.5</Item></Grid>
                        <Grid item p={0} my={-1}><Item>3.0</Item></Grid>
                        <Grid item p={0} my={0}><Item>2.5</Item></Grid>
                        <Grid item p={0} my={-1}><Item>2</Item></Grid>
                        <Grid item p={0} my={0}><Item>1.5</Item></Grid>
                        <Grid item p={0} my={-1}><Item>1.0</Item></Grid>
                        <Grid item p={0} my={0}><Item>0.0</Item></Grid>
                    </Grid>
                    <Grid container direction="column" spacing={0} xs={1.8}>
                        <Grid item p={0} my={0}><Item>GPA</Item></Grid>
                        <Grid item p={0} my={-1}><Item>3.6-4.0</Item></Grid>
                        <Grid item p={0} my={0}><Item>3.00 - 3.59</Item></Grid>
                        <Grid item p={0} my={-1}><Item>60 -69</Item></Grid>
                        <Grid item p={0} my={0}><Item>55 -59</Item></Grid>
                        <Grid item p={0} my={-1}><Item>50 -54</Item></Grid>
                        <Grid item p={0} my={0}><Item>45 - 49</Item></Grid>
                        <Grid item p={0} my={-1}><Item>40 -44</Item></Grid>
                        <Grid item p={0} my={0}><Item>{`< 44`}</Item></Grid>
                    </Grid>
                    <Grid container direction="column" spacing={0} xs={2.4}>
                        <Grid item p={0} my={0}><Item>Class of Degree</Item></Grid>
                        <Grid item p={0} my={-1}><Item>First Class</Item></Grid>
                        <Grid item p={0} my={0}><Item>Second Class-UD</Item></Grid>
                        <Grid item p={0} my={-1}><Item>Second Class-LD</Item></Grid>
                        <Grid item p={0} my={0}><Item>Third Class</Item></Grid>
                        <Grid item p={0} my={-1}><Item>Passed</Item></Grid>
                        <Grid item p={0} my={0}><Item>Upper Division</Item></Grid>
                        <Grid item p={0} my={-1}><Item>Lower Division</Item></Grid>
                        <Grid item p={0} my={0}><Item></Item></Grid>
                    </Grid>
                    <Grid container direction="column" spacing={0} xs={4.3}>
                        <Grid item p={0} my={0}><Item>Key</Item></Grid>
                        <Grid item p={0} my={-1}><Item>I = Incomplete</Item></Grid>
                        <Grid item p={0} my={0}><Item>X = Absent</Item></Grid>
                        <Grid item p={0} my={-1}><Item>* = Mark Obtained After Resit</Item></Grid>
                        <Grid item p={0} my={0}><Item>GP = Grade Point</Item></Grid>
                        <Grid item p={0} my={-1}><Item>GPA = Grade Point Average</Item></Grid>
                        <Grid item p={0} my={0}><Item>WP = Weighted Point</Item></Grid>
                        <Grid item p={0} my={-1}><Item>GD = Grade</Item></Grid>
                    </Grid>
                </Box>
            </Grid>
            <Grid xs={4}>
                <Box textAlign="center">
                    <Typography sx={{ fontSize: 11,  }}>.</Typography>
                </Box>
                <Box display="flex" justifyContent="space-around">

                    <Grid container direction="column" spacing={0} xs={9}>
                        <Grid item p={0} my={-0.2}><Item sx={{ fontSize: 11 }}>Total Credit Attempted:</Item></Grid>
                        <Grid item p={0} my={-0.5}><Item sx={{ fontSize: 11 }}>Overall Credit Earned:</Item></Grid>
                        <Grid item p={0} my={-0.2}><Item sx={{ fontSize: 11 }}>Cumulated GPA:</Item></Grid>
                        <Grid item p={0} my={0.5}><Item sx={{ fontSize: 11 }}>Done in:</Item></Grid>
                        <Grid item p={0} my={1}><Item sx={{ fontSize: 1 }}>.</Item></Grid>
                    </Grid>
                    <Grid container direction="column" spacing={0} xs={3}>
                        <Grid item p={0} my={-0.2}><Item></Item></Grid>
                        <Grid item p={0} my={-0.5}><Item></Item></Grid>
                        <Grid item p={0} my={-0.2}><Item></Item></Grid>
                        <Grid item p={0} my={1}><Item></Item></Grid>
                        <Grid item p={0} my={0.5}><Item></Item></Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    </Box>
  )
}

export default TranscriptFooter