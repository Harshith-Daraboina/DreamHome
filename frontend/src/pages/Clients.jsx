import React, { useState } from 'react';
import { Container, Button, Dialog, DialogTitle } from '@mui/material';
import ClientList from '../components/ClientList';
import ClientForm from '../components/ClientForm';

const Clients = () => {
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
        Add New Client
      </Button>
      <ClientList refresh={refresh} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Client</DialogTitle>
        <ClientForm onSuccess={handleSuccess} />
      </Dialog>
    </Container>
  );
};

export default Clients;