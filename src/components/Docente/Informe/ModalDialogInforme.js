import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import CargarInforme from './cargarInforme';
import { ToastProvider } from 'react-toast-notifications';

const ModalDialog = ({ open, handleClose }) => {
    const [currentId, setCurrentId] = useState(0);
    return (
    <Dialog open={open} onClose={handleClose}>
      <ToastProvider >
      <CargarInforme handleClose={handleClose} {...({ currentId, setCurrentId })} />
      </ToastProvider>
    </Dialog>
  );
};

export default ModalDialog;