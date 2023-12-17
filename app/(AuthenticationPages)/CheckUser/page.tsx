"use client";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
import PageContainer from "@/components/CompAdmin/container/PageContainer";
import AuthCheckUser from "../auth/AuthCheckUser";
import MyProvider from "@/Redux/MyProvider";
import AuthCreatePassword from "../auth/AuthCreatePassword";
import { useState } from "react";

const CheckUserPage = () => {

  const [ showPasswordComp, setShowPasswordComp ] = useState<boolean>(false)
  const [ userID, setUserID ] = useState<number>(0)
  return (
    <MyProvider>
      <PageContainer title="Login" description="this is Login page">
        <Box
          sx={{
            position: "relative",
            "&:before": {
              content: '""',
              background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
              backgroundSize: "400% 400%",
              animation: "gradient 15s ease infinite",
              position: "absolute",
              height: "100%",
              width: "100%",
              opacity: "0.3",
            },
          }}
        >
          <Grid
            container
            spacing={0}
            justifyContent="center"
            sx={{ height: "100vh" }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              lg={4}
              xl={3}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Card
                elevation={9}
                sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
              >
                { showPasswordComp ?

                  <AuthCreatePassword
                    setShowMe={setShowPasswordComp}
                    userID={userID}
                    subtext={
                      <Typography
                        variant="subtitle1"
                        textAlign="center"
                        color="textSecondary"
                        mb={1}
                      >
                      </Typography>
                    }
                    subtitle={
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                        mt={3}
                      >
                        <Typography
                          component={Link}
                          href="/"
                          fontWeight="500"
                          sx={{
                            textDecoration: "none",
                            color: "primary.main",
                          }}
                        >
                          Back To Login
                        </Typography>
                      </Stack>
                    }
                  />

                  :

                  <AuthCheckUser
                    setShowMe={setShowPasswordComp}
                    setUserID={setUserID}
                    subtext={
                      <Typography
                        variant="subtitle1"
                        textAlign="center"
                        color="textSecondary"
                        mb={1}
                      >
                        Result Portal
                      </Typography>
                    }
                    subtitle={
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                        mt={3}
                      >
                        <Typography
                          component={Link}
                          href="/"
                          fontWeight="500"
                          sx={{
                            textDecoration: "none",
                            color: "primary.main",
                          }}
                        >
                          Back To Login
                        </Typography>
                      </Stack>
                    }
                  />
                }

              </Card>
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
    </MyProvider>
  );
};
export default CheckUserPage;
