import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import UsuarioFormTut from './UsuarioFormTut';
import { ToastProvider } from 'react-toast-notifications';

const ModalDialogTut = ({ open, handleClose }) => {
    const [currentId, setCurrentId] = useState(0);

    return (


    // props received
    <Dialog open={open} onClose={handleClose}>
      <ToastProvider >
      <UsuarioFormTut handleClose={handleClose} {...({ currentId, setCurrentId })} />
      </ToastProvider>
    </Dialog>
  );
};

export default ModalDialogTut;