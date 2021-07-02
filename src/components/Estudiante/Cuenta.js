import React, { useEffect, useRef, useState } from 'react';
import { SidebarDataEstudiante } from "../sideBar/SidebarDataEstudiante";
import NavEstudiante from './NavEstudiante';
import Sidebar from '../Sidebar';
import { Avatar } from '@material-ui/core';
import Axios from 'axios';
export default function Cuenta() {

    const [usuario, setUsuario] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [password, setPassword] = useState('');

    const [avatar, setAvatar] = useState();
    const [nombreAvatar,setNombreAvatar]=useState('');

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
            setNombreAvatar(res.nombre.charAt(0) + res.apellido.charAt(0));
        });
    }, []);

    const modificarUsuario = (e) => {
        e.preventDefault();
       
        var x = new FormData();
        if(avatar)
            x.append('file', avatar[0]);
        x.append('nombre', nombre);
        x.append('idUsuario', usuario.idUsuario);
        x.append('idPersona', usuario.idPersona);
        x.append('apellido', apellido);
        x.append('telefono', telefono);
        x.append('email', email);
        x.append('usuarioNombre', nombreUsuario);
        x.append('password', password);
       
        Axios.post("http://localhost:60671/api/usuario/actualizarCuentaUsuario",x);
    }

    return (
        <div>
            <NavEstudiante />
            <div className="d-flex mt-1">
                <Sidebar data={SidebarDataEstudiante} />
                <div className="container">
                    {!usuario ? "Cargando.." :
                        <div className="container">
                            <h2>Mi cuenta</h2>
                            <form  onSubmit={modificarUsuario}>

                                <div className="row">
                                    <div className="col-md-4 d-flex flex-column justify-content-center w-100">
                                        <div className="d-flex flex-column align-items-center">

                                            {avatar ?
                                                <Avatar className="bg-warning"
                                                    style={{ height: "100px", width: "100px" }}>
                                                    <img  className="w-100 h-100" src={"https://uploads.candelaestereo.com/1/2019/10/jhon-alex-castano-se-armo-de-valor-y-abandono-terrible-vicio.jpg"}></img>
                                                    </Avatar>
                                                : <Avatar className="bg-estudiante"
                                                    style={{ height: "100px", width: "100px" }}>
                                                    {nombreAvatar}</Avatar>
                                            }

                                            <h6 className="mt-2">{nombre} {apellido}</h6>

                                            <div class="file-select mt-2" id="src-file1" >
                                                <input type="file" className="h-100" name="src-file1" aria-label="Archivo" onChange={(e) => { setAvatar(e.target.files) }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <p className="font-weight-bold">Datos personales</p>
                                            </div>
                                            <div className="col-md-6">
                                                <label for="nombre" className="labelModificarUsuario">Nombre</label>
                                                <input id="nombre" className="form-control" type="text" value={nombre} onChange={(e) => { setNombre( e.target.value) }} />
                                            </div>
                                            <div className="col-md-6">
                                                <label for="apellido" className="labelModificarUsuario">Apellido</label>
                                                <input id="apellido" className="form-control" type="text" value={apellido} onChange={(e) => { setApellido(e.target.value ) }} />
                                            </div>
                                            <div className="col-md-6 mt-4">
                                                <label for="email" className="labelModificarUsuario">Email</label>
                                                <input id="email" className="form-control" type="email" value={email} onChange={(e) => { setEmail( e.target.value ) }} />
                                            </div>
                                            <div className="col-md-6 mt-4">
                                                <label for="telefono" className="labelModificarUsuario">Teléfono</label>
                                                <input id="telefono" className="form-control" type="text" value={telefono} onChange={(e) => { setTelefono(e.target.value) }} />
                                            </div>
                                            <div className="col-md-12 mt-4">
                                                <p className="font-weight-bold">Datos de usuario</p>
                                            </div>

                                            <div className="col-md-6">
                                                <label for="usuarioNombre" className="labelModificarUsuario">Nombre de Usuario</label>
                                                <input type="text" id="usuarioNombre" className="form-control" value={nombreUsuario} onChange={(e) => { setNombreAvatar( e.target.value ) }} />
                                            </div>
                                            <div className="col-md-6">
                                                <label for="contrasenia" className="labelModificarUsuario">Contraseña</label>
                                                <input type="password" id="contrasenia" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value ) }} />
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

