import React, { useEffect, useState } from 'react';
import { SidebarDataDocente } from "../sideBar/SidebarDataDocente";
import NavDocente from './NavDocente';
import Sidebar from '../Sidebar';
import { Avatar } from '@material-ui/core';
import Axios from 'axios';
import { useCookies } from 'react-cookie';
import swal from 'sweetalert';

export default function Cuenta() {

    const [usuario, setUsuario] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [seleccionoAvatar, setSeleccionoAvatar] = useState(false);
    const [avatar, setAvatar] = useState();
    const [nombreAvatar, setNombreAvatar] = useState('');
    const [cookies, setCookie] = useCookies(["usuario"]);

    useEffect(() => {
        fetch("http://localhost:60671/api/usuario/getCuentaUsuario", {
            method: 'GET',
            headers: { "Content-type": "application/json" },
            credentials: "include",
        }).then(res => {
            if (!res.ok) throw new Error('Response is NOT ok')
            return res.json()
        }).then(res => {
            setUsuario(res);
            setNombre(res.nombre);
            setApellido(res.apellido);
            setEmail(res.email);
            setTelefono(res.telefono);
            setNombreUsuario(res.usuarioNombre);
            setNombreAvatar(res.avatar);
        });
    }, []);

    const cambiaFile = (e) => {
        if (e.target.files[0]) {
            setAvatar(e.target.files[0]);
            setSeleccionoAvatar(true);
        } else {
            setAvatar();
            setSeleccionoAvatar(false);
        }
    }
    const modificarUsuario = async (e) => {
        e.preventDefault();

        var x = new FormData();
        if (avatar)
            x.append('file', avatar);
        x.append('nombre', nombre);
        x.append('idUsuario', usuario.idUsuario);
        x.append('idPersona', usuario.idPersona);
        x.append('apellido', apellido);
        x.append('telefono', telefono);
        x.append('email', email);
        x.append('usuarioNombre', nombreUsuario);
        x.append('password', password);

        await Axios.post("http://localhost:60671/api/usuario/actualizarCuentaUsuario", x).then(response => {
            setCookie('avatarNombre', '', { path: '/' });
            setCookie('avatarPath', '', { path: '/' });
        if(response.status===204 || response.status===200){

            if (seleccionoAvatar) {
                setCookie('avatarNombre', '', { path: '/' });
                setCookie('avatarPath', response.data, { path: '/' });
            } else {
                if(response.data){
                    setCookie('avatarNombre', '', { path: '/' });
                    setCookie('avatarPath', response.data, { path: '/' });
                }else{
                    setCookie('avatarPath', '', { path: '/' });
                    setCookie('avatarNombre', nombre.charAt(0) + apellido.charAt(0), { path: '/' });
                }
            }
            
        }
        });
        await swal("Perfil modificado",'' , "success");
        window.location.reload();
    }

    return (
        <div>
            <NavDocente />
            <div className="d-flex mt-1">
                <Sidebar data={SidebarDataDocente} />
                <div className="container">
                    {!usuario ? "Cargando.." :
                        <div className="container">
                            <h2>Mi cuenta</h2>
                            <form onSubmit={modificarUsuario}>

                                <div className="row">
                                    <div className="col-md-4 d-flex flex-column justify-content-center w-100">
                                        <div className="d-flex flex-column align-items-center">

                                            {seleccionoAvatar ?
                                                <Avatar className="bg-docente"
                                                    style={{ height: "100px", width: "100px" }}>
                                                    <img src={URL.createObjectURL(avatar)} />
                                                </Avatar>
                                                : <Avatar className="bg-docente"
                                                    style={{ height: "100px", width: "100px" }}>
                                                    {nombreAvatar ?
                                                        <img className="w-100 h-100"
                                                            src={"http://localhost:60671/Avatares/" + nombreAvatar}
                                                            style={{ objectFit: "cover" }} /> : nombre.charAt(0) + apellido.charAt(0)}
                                                </Avatar>
                                            }
                                            <h6 className="mt-2">{nombre} {apellido}</h6>

                                            <div class="file-select mt-2" id="src-file1" >
                                                <input type="file" className="h-100" name="src-file1" aria-label="Archivo" onChange={cambiaFile} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <p className="font-weight-bold">Datos personales</p>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="nombre" className="labelModificarUsuario">Nombre</label>
                                                <input id="nombre" required className="form-control" type="text" value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="apellido" className="labelModificarUsuario">Apellido</label>
                                                <input id="apellido" required className="form-control" type="text" value={apellido} onChange={(e) => { setApellido(e.target.value) }} />
                                            </div>
                                            <div className="col-md-6 mt-4">
                                                <label htmlFor="email" className="labelModificarUsuario">Email</label>
                                                <input id="email" required className="form-control" type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                            </div>
                                            <div className="col-md-6 mt-4">
                                                <label htmlFor="telefono" className="labelModificarUsuario">Teléfono</label>
                                                <input id="telefono" required className="form-control" type="text" value={telefono} onChange={(e) => { setTelefono(e.target.value) }} />
                                            </div>
                                            <div className="col-md-12 mt-4">
                                                <p className="font-weight-bold">Datos de usuario</p>
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="usuarioNombre" className="labelModificarUsuario">Nombre de Usuario</label>
                                                <input type="text" required id="usuarioNombre" className="form-control" value={nombreUsuario} onChange={(e) => { setNombreUsuario(e.target.value) }} />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="contrasenia" className="labelModificarUsuario">Contraseña</label>
                                                <input type="password" id="contrasenia" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                            </div>
                                            <div className="col-md-12 d-flex flex-row-reverse mt-4">
                                                <button type="submit" className="btn btn-danger">Guardar datos</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

