import React from "react";
import { Card, CardContent, Typography, Stack, Box, LinearProgress } from "@mui/material";

type Props = {
  title?: string;
  count?: number;
  subtitle?: string;
  action?: JSX.Element | any;
  footer?: JSX.Element;
  cardheading?: string | JSX.Element;
  headtitle?: string | JSX.Element;
  headsubtitle?: string | JSX.Element;
  children?: JSX.Element;
  cardColor?: string;
  loading: boolean;
};

const DashboardCard = ({
  title,
  subtitle,
  children,
  count,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  cardColor,
  loading
}: Props) => {
  return (
    <>
      {!loading ? 
        <Card sx={{ padding: 0, backgroundColor: cardColor }} elevation={9} variant={undefined}>
          {cardheading ? (
            <CardContent>
              <Typography variant="h5">{headtitle}</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {headsubtitle}
              </Typography>
            </CardContent>
          ) : (
            <CardContent sx={{ p: "10px" }}>
              {title ? (
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems={"center"}
                  mb={3}
                >
                  <Box>
                    {title ? <Typography variant="h5">{title}</Typography> : ""}
    
                    {subtitle ? (
                      <Typography variant="subtitle2" color="textSecondary">
                        {subtitle}
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Box>
                  <Box>
                    {count ? <Typography variant="h5">{count}</Typography> : ""}
                  </Box>
                  {action}
                </Stack>
              ) : null}
    
              {children}
            </CardContent>
          )}
          {footer}
        </Card>
        
        : 
        
        <div style={{ flex: 1, alignItems: "center", textAlign: "center", justifyContent: "center", fontSize: "30", paddingTop: 50, paddingBottom: 70, paddingLeft: 60, paddingRight: 25 }}>
            Data Loading <LinearProgress style={{ marginTop: 30, padding: 5 }}/>
        </div>  
      }
    </>
  );
};

export default DashboardCard;
