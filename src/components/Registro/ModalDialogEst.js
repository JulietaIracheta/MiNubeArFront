import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import UsuarioFormEst from './UsuarioFormEst';
import { ToastProvider } from 'react-toast-notifications';

const ModalDialogEst = ({ open, handleClose }) => {
    const [currentId, setCurrentId] = useState(0);

    return (


    // props received from App.js
    <Dialog open={open} onClose={handleClose}>
      <ToastProvider >
      <UsuarioFormEst handleClose={handleClose} {...({ currentId, setCurrentId })} />
      </ToastProvider>
    </Dialog>
  );
};

export default ModalDialogEst;