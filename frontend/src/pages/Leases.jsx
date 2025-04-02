import React, { useState } from 'react';
import { Container, Button, Dialog, DialogTitle } from '@mui/material';
import LeaseList from '../components/LeaseList';
import LeaseForm from '../components/LeaseForm';

const Leases = () => {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSuccess = () => {
    setRefresh(!refresh);
    handleClose();
  };

  return (
    <Container className="py-30">
      <Button 
        variant="contained" 
        onClick={handleOpen}
        sx={{ mb: 3 }}
      >
        Add New Lease
      </Button>
      <LeaseList refresh={refresh} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Lease</DialogTitle>
        <LeaseForm onSuccess={handleSuccess} />
      </Dialog>
    </Container>
  );
};

export default Leases;