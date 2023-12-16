import { Box, Typography, Button } from '@mui/material';
import img1 from 'public/images/backgrounds/stjoan.jpg';
import Image from 'next/image';
import Link from 'next/link';

export const Upgrade = () => {
    return (
        <Box
            display={'flex'}
            alignItems="center"
            gap={2}
            sx={{ m: 2, p: 2, bgcolor: `${'primary.light'}`, borderRadius: '8px' }}
            pt="50px"
            mb="-20px"
            bottom="0"
            position="fixed"
        >
            <>
                <Box p={0}>
                    <Typography variant="h6" mb={1}>Main Site</Typography>
                    <Button color="primary" target="_blank" disableElevation component={Link} href="https://www.st-joan.com" variant="contained" aria-label="logout" size="small">
                        st-joan.com
                    </Button>
                </Box>
                <Box mt="-6px">
                    <Image alt="Remy Sharp" src={img1} width={70} />
                </Box>
            </>
        </Box>
    );
};
