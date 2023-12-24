import { Box, Button, Modal } from '@mui/material';
import React, { FC } from 'react';
import TranscriptFor1Years from '../TranscriptFor1years';
import { ResultProps } from '@/Utils/types';


interface PrintTranscriptProps {
    open: boolean
    setOpen: any
    selectedAcademicYearToPrint: any
    dataToPrint: ResultProps[]
}

const PrintTranscriptModal:FC<PrintTranscriptProps> = ({ open, setOpen, selectedAcademicYearToPrint, dataToPrint }) => {
  
  return (
    <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 627 }}>
        <h2 id="parent-modal-title">Transcript Preview</h2>
          {selectedAcademicYearToPrint == "all" ? <p>
            Print For Years (Under Development)
          </p> : <p>
            <TranscriptFor1Years
              dataToPrint={dataToPrint}
            />
          </p>}
      </Box>
    </Modal>
  )
}

export default PrintTranscriptModal;

const ChildModal = () => {
  const [openChild, setOpenChild] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setOpenChild(true)}>Print Transcript</Button>
      <Modal
        open={openChild}
        onClose={() => setOpenChild(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="child-modal-title">Confirm To Print</h2>
          <p id="child-modal-description">
            Are You Sure to Print Transript For this student?
          </p>
          <Button onClick={() => setOpenChild(false)}>Cancel</Button>
          <Button onClick={() => setOpenChild(false)}>Print</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};