import { useState, useEffect } from "react";
import Dialog from '@material-ui/core/Dialog';
import qs from 'qs'


const RecuperarPassword = ({open, handleClose}) => {
  
    const [email, setEmail] = useState('')
    const data = { 'ToEmail': email };
    const enviarMail = async (e) => {
      //      e.preventDefault();
        
            const response = await fetch("http://localhost:60671/api/mail/passwordrecovery", {
              method: 'POST',
              headers: { 'content-type': 'application/x-www-form-urlencoded' },
              body: qs.stringify(data),
            }
            );
            setEmail('')
            handleClose();
        }        
    
    const handleInputChange = (e) => {
        setEmail(e.target.value)
    }

    return (
       
        <Dialog open={open} onClose={handleClose}>
                    <div className="container p-4">
                    <h3>Por favor ingrese su email</h3>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text" name="email" className="form-control" id="email" 
                                value = {email}
                                onChange = { handleInputChange }
                                />
                         </div> 
                    <button type="submit" className="btn btn-outline-primary float-right ml-1 mt-2" onClick = { () => enviarMail()}>Enviar</button>
                    <button className="btn btn-secondary float-right mt-2"    onClick={handleClose}>Cancelar</button> 
                    </div>
            </Dialog>
        );
};
export default RecuperarPassword;


    




