import React, { useState } from 'react';
import { Container, Button, Dialog, DialogTitle } from '@mui/material';
import OwnerList from '../components/OwnerList';
import OwnerForm from '../components/OwnerForm';

const Owners = () => {
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
        Add New Owner
      </Button>
      <OwnerList refresh={refresh} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Owner</DialogTitle>
        <OwnerForm onSuccess={handleSuccess} />
      </Dialog>
    </Container>
  );
};

export default Owners;