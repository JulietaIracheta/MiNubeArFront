import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import ComunicadoForm from './comunicadoForm';
import { ToastProvider } from 'react-toast-notifications';

const ModalDialog = ({ open, handleClose,idCurso }) => {
    const [currentId, setCurrentId] = useState(0);
    return (
    <Dialog open={open} onClose={handleClose}>
      <ToastProvider >
      <ComunicadoForm handleClose={handleClose} idCurso={idCurso} {...({ currentId, setCurrentId })} />
      </ToastProvider>
    </Dialog>
  );
};

export default ModalDialog;