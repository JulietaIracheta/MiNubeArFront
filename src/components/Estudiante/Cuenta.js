import React, { useEffect, useState } from 'react';
import { SidebarDataEstudiante } from "../sideBar/SidebarDataEstudiante";
import NavEstudiante from './NavEstudiante';
import Sidebar from '../Sidebar';
import { Avatar } from '@material-ui/core';
import Axios from 'axios';
import { Cookies, useCookies } from 'react-cookie';
import swal from 'sweetalert';
import url from "../../url"

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
    const cookie = new Cookies();
    const jwt = cookie.get('jwt');
    


    useEffect(() => {
        fetch(`${url.url}/api/usuario/getCuentaUsuario?jwt=`+jwt, {
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

        await Axios.post(`${url.url}/api/usuario/actualizarCuentaUsuario`, x).then(response => {
            setCookie('avatarNombre', '', { path: '/' });
            setCookie('avatarPath', '', { path: '/' });
            if (response.status === 204 || response.status === 200) {
                if (seleccionoAvatar) {
                    setCookie('avatarNombre', '', { path: '/' });
                    setCookie('avatarPath', response.data, { path: '/' });
                } else {
                    if (response.data) {
                        setCookie('avatarNombre', '', { path: '/' });
                        setCookie('avatarPath', response.data, { path: '/' });
                    } else {
                        setCookie('avatarPath', '', { path: '/' });
                        setCookie('avatarNombre', nombre.charAt(0) + apellido.charAt(0), { path: '/' });
                    }
                }

            }
        });
        await swal("Perfil modificado", '', "success");
        window.location.reload();
    }

    return (
        <div>
            <NavEstudiante />
            <div className="d-flex">
                <Sidebar data={SidebarDataEstudiante} />
                <div className="main w-100 pr-2 pt-4">
                    <div className="mb-4 pl-3 pl-sm-2">
                        <span className="tituloadmin tituloEstudiante">Mi cuenta</span>
                    </div>
                    {!usuario ? "Cargando.." :
                        <div className="p-1 p-sm-3" >
                            <div className="mb-4 pl-3 pl-sm-2">
                    </div>
                            <form onSubmit={modificarUsuario}>
                                <div className="row m-0">
                                    <div className="bg-white pt-4 pb-4 pt-md-0 col-md-4 col-lg-3 col-xl-3 p-1 p-md-3 d-flex flex-column justify-content-center w-100 mb-4 mb-md-0" style={{border:"1px solid #edf2f9"}}>
                                        <div className="d-flex flex-column align-items-center">

                                            {seleccionoAvatar ?
                                                <Avatar className="bg-estudiante"
                                                    style={{ height: "120px", width: "120px" }}>
                                                    <img src={URL.createObjectURL(avatar)} />
                                                </Avatar>
                                                : <Avatar className="bg-estudiante"
                                                    style={{ height: "120px", width: "120px" }}>
                                                    {nombreAvatar ?
                                                        <img className="w-100 h-100"
                                                            src={`${url.url}/Avatares/` + nombreAvatar}
                                                            style={{ objectFit: "cover" }} /> : nombre.charAt(0) + apellido.charAt(0)}
                                                </Avatar>
                                            }
                                            <h6 className="mt-2 font-weight-bold">{nombre} {apellido}</h6>

                                            <div class="file-select mt-2 " id="src-file1" >
                                                <input type="file" className="h-100" name="src-file1" aria-label="Archivo" onChange={cambiaFile} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8 col-lg-9 col-xl-6 bg-white pt-3 p-1 p-md-3" style={{border:"1px solid #edf2f9"}}>
                                        <div className="row m-0">
                                            <div className="col-md-12">
                                                <p className="font-weight-bold" style={{color:"rgba(45, 47, 133, .75)"}}>Datos personales</p>
                                            </div>
                                            <div className="col-md-6 mb-2">
                                                <label for="nombre" className="labelModificarUsuario mb-0">Nombre</label>
                                                <input id="nombre" required className="form-control" type="text" value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                                            </div>
                                            <div className="col-md-6 mb-2">
                                                <label for="apellido" className="labelModificarUsuario mb-0">Apellido</label>
                                                <input id="apellido" required className="form-control" type="text" value={apellido} onChange={(e) => { setApellido(e.target.value) }} />
                                            </div>
                                            <div className="col-md-6 mb-2">
                                                <label for="email" className="labelModificarUsuario mb-0">Email</label>
                                                <input id="email" required className="form-control" type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <label for="telefono" className="labelModificarUsuario mb-0">Teléfono</label>
                                                <input id="telefono" required className="form-control" type="text" value={telefono} onChange={(e) => { setTelefono(e.target.value) }} />
                                            </div>
                                            <div className="col-md-12 mb-0">
                                                <p className="font-weight-bold"  style={{color:"rgba(45, 47, 133, .75)"}}>Datos de usuario</p>
                                            </div>

                                            <div className="col-md-6 mb-0">
                                                <label for="usuarioNombre" className="labelModificarUsuario mb-0">Nombre de Usuario</label>
                                                <input type="text" required id="usuarioNombre" className="form-control" value={nombreUsuario} onChange={(e) => { setNombreUsuario(e.target.value) }} />
                                            </div>
                                            <div className="col-md-6 mb-0">
                                                <label for="contrasenia" className="labelModificarUsuario mb-0">Contraseña</label>
                                                <input type="password" id="contrasenia" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                            </div>
                                            <div className="col-md-12 d-flex flex-row-reverse mt-4 m-0">
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

