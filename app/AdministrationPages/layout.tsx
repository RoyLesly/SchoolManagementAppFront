"use client";
import React, { useState } from "react";
import Sidebar from "@/app/AdministrationPages/layout/sidebar/Sidebar";
import MyProvider from "@/Redux/MyProvider";
import { IconBellRinging, IconMenu } from '@tabler/icons-react';
import Footer from "@/app/AdministrationPages/layout/footer/Footer";
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button } from '@mui/material';
import Profile from "./layout/header/Profile";
import { useSelector } from "react-redux";
import { selectAuthUser } from "@/Redux/Reducers/sliceUser";


const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "1px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));


const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  // const storeUser = useSelector(selectAuthUser)

  return (
    <MyProvider>
      <MainWrapper className="mainwrapper">
        {/* Sidebar */}
        <Sidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        {/* Main Wrapper */}
        <PageWrapper className="page-wrapper m-2">

          {/* Header */}
          <AppBarStyled position="sticky" color="default">
            <ToolbarStyled>
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={() => setMobileSidebarOpen(true)}
                sx={{
                  display: {
                    lg: "none",
                    xs: "inline",
                  },
                }}
              >
                <IconMenu width="20" height="20" />
              </IconButton>


              <IconButton
                size="large"
                aria-label="show 11 new notifications"
                color="inherit"
                aria-controls="msgs-menu"
                aria-haspopup="true"
              >
                <Badge variant="dot" color="primary">
                  <IconBellRinging size="21" stroke="1.5" />
                </Badge>

              </IconButton>
              <Box flexGrow={1} />
              <Stack spacing={1} direction="row" alignItems="center">
                <Button variant="contained" disableElevation color="primary"  target="_blank" href="">
                  {/* {storeUser.id ? storeUser.username : "-"} */}
                </Button>
                <Profile />
              </Stack>
            </ToolbarStyled>
          </AppBarStyled>

          {/* PageContent */}
          <Box 
            p={1} 
            sx={{ 
              backgroundColor: "#DFFCFC",
              flexGrow: 1 ,
              marginBottom: 6,
            }}>
            {children}
          </Box>

          {/* PageFooter */}
            <Footer />
          
        </PageWrapper>
      </MainWrapper>
    </MyProvider>
  );
}

export default (RootLayout);
// export default WithAuthentication(RootLayout);