import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import UsuarioFormDoc from './UsuarioFormDoc';
import { ToastProvider } from 'react-toast-notifications';

const ModalDialogDoc = ({ open, handleClose }) => {
    const [currentId, setCurrentId] = useState(0);

    return (


    // props received from App.js
    <Dialog open={open} onClose={handleClose}>
      <ToastProvider >
      <UsuarioFormDoc handleClose={handleClose} {...({ currentId, setCurrentId })} />
      </ToastProvider>
    </Dialog>
  );
};

export default ModalDialogDoc;