import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import EventoForm from './EventoForm';


const ModalDialog = ({ open, handleClose }) => {
    const [currentId, setCurrentId] = useState(0);

    return (


    // props received
    <Dialog open={open} onClose={handleClose}>
      <EventoForm handleClose={handleClose} {...({ currentId, setCurrentId })} />
    </Dialog>
  );
};

export default ModalDialog;