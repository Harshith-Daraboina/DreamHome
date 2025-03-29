import React, { useState } from 'react';
import { Container, Button, Dialog, DialogTitle } from '@mui/material';
import StaffList from '../components/StaffList';
import StaffForm from '../components/StaffForm';

const Staff = () => {
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
        Add New Staff
      </Button>
      <StaffList refresh={refresh} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Staff</DialogTitle>
        <StaffForm onSuccess={handleSuccess} />
      </Dialog>
    </Container>
  );
};

export default Staff;