import TranscriptBody3years from "@/components/CompTranscript/TranscriptBody3years";
import TranscriptFooter from "@/components/CompTranscript/TranscriptFooter";
import TranscriptHeader from "@/components/CompTranscript/TranscriptHeader";
import { Box, Button, Grid, Typography } from "@mui/material";
import generatePDF, { Options } from "react-to-pdf";
// import { Card } from "./Card";
// import { Button } from "./Button";
// import { Container } from "./Container";

const options: Options = {
  filename: "using-function.pdf",
  page: {
    margin: 20
  }
};

const getTargetElement = () => document.getElementById("container");

const downloadPdf = () => generatePDF(getTargetElement, options);

const App = () => {
  return (
    <div className="bg-red-500">
      <Box 
        mx="auto" 
        mb={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          justifyItem: "center",
          flexGrow: 1,
        }}>
        <Button variant="outlined">Print</Button>
      </Box>
      <Box
        px={2.5}
        py={1.5}
        mx="auto"
        border={1}
        borderRadius={1}
        width={565.6} 
        height={800} 
        sx={{ 
          backgroundColor: "#FFFFFF",
          flexGrow: 1,
          marginBottom: 0,
        }}
      >
        {/* <TranscriptHeader /> */}
        <TranscriptBody3years />
        <TranscriptFooter />
      </Box>
    </div>
  );
};

export default App;
