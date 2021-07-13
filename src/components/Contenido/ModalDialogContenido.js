import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import ContenidoForm from './contenidoForm';
import { ToastProvider } from 'react-toast-notifications';

const ModalDialog = ({ open, handleClose, idCurso, idMateria}) => {
    const [currentId, setCurrentId] = useState(0);
    return (
    <Dialog open={open} onClose={handleClose}>
      <ToastProvider >
      <ContenidoForm idCurso={idCurso} idMateria={idMateria} handleClose={handleClose} {...({ currentId, setCurrentId })} />
      </ToastProvider>
    </Dialog>
  );
};

export default ModalDialog;