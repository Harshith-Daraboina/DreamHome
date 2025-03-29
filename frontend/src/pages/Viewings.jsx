import React, { useState } from 'react';
import { Container, Button, Dialog, DialogTitle } from '@mui/material';
import ViewingList from '../components/ViewingList';
import ViewingForm from '../components/ViewingForm';

const Viewings = () => {
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
        Add New Viewing
      </Button>
      <ViewingList refresh={refresh} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Viewing</DialogTitle>
        <ViewingForm onSuccess={handleSuccess} />
      </Dialog>
    </Container>
  );
};

export default Viewings;