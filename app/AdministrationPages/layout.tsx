"use client";
import { styled, Box } from "@mui/material";
import React, { useState } from "react";
import Header from "@/app/AdministrationPages/layout/header/Header";
import Sidebar from "@/app/AdministrationPages/layout/sidebar/Sidebar";
import MyProvider from "@/Redux/MyProvider";
import Footer from "@/app/AdministrationPages/layout/footer/Footer";


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



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
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
          <Header 
          // toggleMobileSidebar={setMobileSidebarOpen} 
          />

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
          {/* <Box px={2} py={2} sx={{ backgroundColor: "#AFCFCF", justifyItems: "center" }}> */}
            <Footer />
          {/* </Box> */}
          
        </PageWrapper>
      </MainWrapper>
    </MyProvider>
  );
}
