import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import InstitucionForm from './InstitucionForm';
import { ToastProvider } from 'react-toast-notifications';

const ModalDialog = ({ open, handleClose }) => {
    const [currentId, setCurrentId] = useState(0);

    return (


    // props received
    <Dialog open={open} onClose={handleClose}>
      <ToastProvider >
      <InstitucionForm handleClose={handleClose} {...({ currentId, setCurrentId })} />
      </ToastProvider>
    </Dialog>
  );
};

export default ModalDialog;