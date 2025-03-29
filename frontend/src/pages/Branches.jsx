import React, { useState } from 'react';
import { Container, Button, Dialog, DialogTitle } from '@mui/material';
import BranchList from '../components/BranchList';
import BranchForm from '../components/BranchForm';

const Branches = () => {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSuccess = () => {
    setRefresh(!refresh);
    handleClose();
  };

  return (
    <Container>
      <Button 
        variant="contained" 
        onClick={handleOpen}
        sx={{ mb: 3 }}
      >
        Add New Branch
      </Button>
      <BranchList refresh={refresh} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Branch</DialogTitle>
        <BranchForm onSuccess={handleSuccess} />
      </Dialog>
    </Container>
  );
};

export default Branches;