import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import logo from "../assets/img/logo.png";
import GoogleLogin from "react-google-login";
import MicrosoftLogin from 'react-microsoft-login'
import { GoogleLoginButton, MicrosoftLoginButton } from "react-social-login-buttons";

import "../assets/css/css-login.css";
import { Redirect } from "react-router";
import { Cookies, useCookies } from "react-cookie";
import swal from "sweetalert";
import RecuperarPassword from './RecuperarPassword';
import config from "../config";

const Login = () => {
  const [cookies, setCookie] = useCookies(["usuario"]);
  const [email, setEmail] = useState("");
  const [emailM, setEmailM] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = useState(false);
  const [clientId, onClientIdChange] = useState(config.client_id);
  const [callbackUrl, onCallbackUrlChange] = useState(
    'http://localhost:3000' || window.location.href
  );
  const [buttonTheme, onButtonThemeChange] = useState(
    config.themeOptions[1].value
  );
  const [graphScopes, onGraphScopesChange] = useState([
    config.graphScopesOptions[0].value,
  ]);
  const [withUserData, onWithUserDataChange] = useState(true);
  const [customClassName, onCustomClassNameChange] = useState("w-100 mt-3");
  const [customButton, onCustomButtonChange] = useState(false);
  const [forceRedirectStrategy, onForceRedirectStrategyChange] = useState(
    false
  );
  const [debug, onDebugChange] = useState(true);

  const cookie = new Cookies();
  const responseGoogle = async (res) => {
    let emailGoogle = res.profileObj.email;
    setEmail(res.profileObj.email);
    setCookie('Name', res.profileObj.name, { path: '/' });
    const imageGoogle= res.profileObj.imageUrl;

    const response = await fetch("http://localhost:60671/api/usuario/loginGoogle?email=" + emailGoogle, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    }).then(res => {
      if (!res.ok) throw new Error('Response is NOT ok')
      return res.json()
    }).then(res => {
      cookie.set('nombrePersona', res.nombre);
      setCookie('avatarPathGoogle', imageGoogle, { path: '/' });
      const nombre = res.nombre.charAt(0) + res.apellido.charAt(0);
      setCookie('jwt', res.jwt, { path: '/' });
      setCookie('avatar', nombre, { path: '/' });
    }).catch(err=>{
      swal("No se puede iniciar sesión con los campos ingresados", '', "warning");  
      setRedirect(false);
      return;
    });
    setRedirect(true);

  }

  const responseMicrosoft = async (err, data, msal) => {

    if(!data) return;
    console.log(data);
    const response = await fetch("http://localhost:60671/api/usuario/loginMicrosoft?email=" + data.userPrincipalName, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    }).then(res => {
      if (!res.ok) throw new Error('Response is NOT ok')
      return res.json()
    }).then(res => {
      setEmailM(data.mail);
      cookie.set('nombrePersona', data.givenName);
      cookie.set('email', data.mail );
      const nombre = data.givenName.charAt(0) + data.surname.charAt(0);
      setCookie('avatar', nombre, { path: '/' });
      setCookie('jwt', res.jwt, { path: '/' });
      setRedirect(true);
    }).catch(err=>{
      swal("No se puede iniciar sesión con los campos ingresados", '', "warning");  
      setRedirect(false);
      return;
    });
    setRedirect(true);
  }



  const onChange = () => {
    setOpen(!open)
    console.log(open)
  }
  const handleClose = () => {
    setOpen(false)
  }


  const submit = async (e, rol) => {
    e.preventDefault();

    const response = await fetch("http://localhost:60671/api/usuario/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        UsuarioNombre: email,
        password,
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
      }).then(res => {
        if(!res.avatar){
          cookie.remove("avatarPath");
          const nombre = res.nombre.charAt(0) + res.apellido.charAt(0);
          setCookie('avatarNombre', nombre, { path: '/' });
        }else{
          cookie.remove("avatarNombre");
          setCookie('avatarPath', res.avatar, { path: '/' });
        }
        cookie.set('nombrePersona', res.nombre);
         setCookie('jwt', res.jwt, { path: '/' });
        cookie.set('jwt', res.jwt);
        setCookie('rol', res.rolId);
        console.log(res.rolId);
        cookie.set('apellidoPersona', res.apellido);
        
        setCookie('email', email, { path: '/' });
        setRedirect(true);
      }).catch(err=>{
          swal("No se puede iniciar sesión con los campos ingresados", '', "warning");  
          setRedirect(false);
        });
    
  };

  if (redirect) {
    
    return <Redirect to="/rol" />;
  }

  return (
    <div className="back d-flex justify-content-center align-items-center w-100" style={{height:"100vh",}}>
       <div className="logo-container">
          <img src={logo} className="logo"></img>
        </div>
      <div className="container-col-derecha" style={{width:"30%"}}>

      <Form className="w-100" onSubmit={submit}>
        <div className="w-100">
          <FormGroup>
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </FormGroup>
          <Button className="btn btn-lg boton-login btn-block">Ingresar</Button>
          </div>
          </Form>

          <div className="text-center pt-3">Ingresá con: </div>
          <div className="redes-sociales">

          <GoogleLogin clientId="1008891152271-jvlq4r789kf6mlihar2uekqthgn30dob.apps.googleusercontent.com"
            buttonText="Ingresar con Google"
            onSuccess={responseGoogle}
            onFailure={()=>{console.log("error login google")}}
            cookiePolicy={'single_host_origin'}
            className="w-100 mt-3">
            </GoogleLogin>
         <MicrosoftLogin
                withUserData={withUserData}
                debug={debug}
                clientId={clientId}
                forceRedirectStrategy={forceRedirectStrategy}
                authCallback={responseMicrosoft}
                buttonTheme="light"
                graphScopes={graphScopes}
                className="w-100"
                useLocalStorageCache={true}
            >
              <MicrosoftLoginButton 
                text="Ingresar con Microsoft" 
                style={{fontSize:"14px", margin:"0px", width:"100%"}} type="button"
                className="mt-3"/>
              
          </MicrosoftLogin>

          <div className="text-center pt-2">
            <a href="#"  className="text-decoration-none text-danger w-100 mt-4" size="sm" onClick = { () => onChange()}>Recuperar Password</a>
          </div>
        <RecuperarPassword
          open = {open}
          handleClose={handleClose}
        >
        </RecuperarPassword>
      </div>
      </div>
    
      </div>
  );
};
//<a href="/recuperar_password" className="text-decoration-none">¿Olvidó su contraseña?</a>
export default Login;