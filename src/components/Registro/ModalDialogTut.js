import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import UsuarioFormTut from './UsuarioFormTut';

const ModalDialogTut = ({ open, handleClose }) => {
    const [currentId, setCurrentId] = useState(0);

    return (


    // props received
    <Dialog open={open} onClose={handleClose}>
      <UsuarioFormTut handleClose={handleClose} {...({ currentId, setCurrentId })} />
    </Dialog>
  );
};

export default ModalDialogTut;