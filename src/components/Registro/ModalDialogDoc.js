import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import UsuarioFormDoc from './UsuarioFormDoc';


const ModalDialogDoc = ({ open, handleClose }) => {
    const [currentId, setCurrentId] = useState(0);

    return (


    // props received from App.js
    <Dialog open={open} onClose={handleClose}>
      <UsuarioFormDoc handleClose={handleClose} {...({ currentId, setCurrentId })} />
    </Dialog>
  );
};

export default ModalDialogDoc;