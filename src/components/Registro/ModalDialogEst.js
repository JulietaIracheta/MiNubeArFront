import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import UsuarioFormEst from './UsuarioFormEst';

const ModalDialogEst = ({ open, handleClose }) => {
    const [currentId, setCurrentId] = useState(0);

    return (


    // props received from App.js
    <Dialog open={open} onClose={handleClose}>
      <UsuarioFormEst handleClose={handleClose} {...({ currentId, setCurrentId })} />
    </Dialog>
  );
};

export default ModalDialogEst;