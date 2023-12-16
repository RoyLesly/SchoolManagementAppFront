import { ResultProps } from "@/Utils/types";
import TranscriptBody1years from "@/components/CompTranscript/TranscriptBody1years";
import TranscriptFooter from "@/components/CompTranscript/TranscriptFooter";
import TranscriptHeader from "@/components/CompTranscript/TranscriptHeader";
import { Box, Button } from "@mui/material";
import { FC, useRef } from "react";
import { useReactToPrint } from 'react-to-print';


// const options: Options = {
//   filename: "using-function.pdf",
//   page: {
//     margin: 10
//   }
// };

const getTargetElement = () => document.getElementById("container");

interface TranscriptFor1YearsProps {
  dataToPrint: ResultProps[]
}

const TranscriptFor1Years:FC<TranscriptFor1YearsProps> = ({ dataToPrint }) => {
  console.log(dataToPrint)
  const componentRefPrint = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => componentRefPrint.current,
  });

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
        <Button variant="outlined" onClick={handlePrint}>Print</Button>
      </Box>
      <Box
        width={400} 
        height={500} 
      >
        <Box
          ref={componentRefPrint}
          px={5}
          py={5}
          mx="auto"
          my="auto"
          border={1}
          borderRadius={1}
          width={790} 
          height={1117.3} 
          sx={{ 
            backgroundColor: "#FFFFFF",
            flexGrow: 1,
            marginBottom: 0,
          }}
        >
          <TranscriptHeader data={dataToPrint[0]} />
          <TranscriptBody1years data={dataToPrint} />
          <TranscriptFooter />
        </Box>
      </Box>
    </div>
  );
};

export default TranscriptFor1Years;
