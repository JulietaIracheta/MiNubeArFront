import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
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
import url from "../url"

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

    const response = await fetch(`${url.url}/api/usuario/loginGoogle?email=` + emailGoogle, {
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
    const response = await fetch(`${url.url}/api/usuario/loginMicrosoft?email=` + data.userPrincipalName, {
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

    const response = await fetch(`${url.url}/api/usuario/login`, {
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
          cookie.set('jwt', res.jwt);
        }else{
          cookie.remove("avatarNombre");
          setCookie('avatarPath', res.avatar, { path: '/' });
          cookie.set('jwt', res.jwt);
        }
        cookie.set('nombrePersona', res.nombre);      
        setCookie('rol', res.rolId);
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
    <div className="bg-light d-flex justify-content-center align-items-center w-100 pl-3 pr-4 pt-0" style={{height:"100vh",}}>
      <div className="login-container d-flex flex-column flex-md-row justify-content-between w-100 w-lg-75">
        <div className="logo-container d-md-block d-md-flex align-self-center m-auto p-5">
          <img src={logo} className="logo"></img>
        </div>

        <div class="card p-3 p-sm-5 w-100 m-auto m-md-0 border-0">
          <form onSubmit={submit}>
              <h2 class="text-center m-0 text-secondary">Iniciar Sesión</h2>
              <div class="social-login d-flex flex-column justify-content-center">
                <button class="border-0 bg-white w-100">
                    <GoogleLogin clientId="1008891152271-jvlq4r789kf6mlihar2uekqthgn30dob.apps.googleusercontent.com"
                        buttonText="Ingresar con Google"
                        onSuccess={responseGoogle}
                        onFailure={()=>{console.log("error login google")}}
                        cookiePolicy={'single_host_origin'}
                        className="w-100 mt-3">
                    </GoogleLogin>
                </button>
                <button class="p-0 w-100 bg-white border-0">
                    <MicrosoftLogin
                      withUserData={withUserData}
                      debug={debug}
                      clientId={clientId}
                      forceRedirectStrategy={forceRedirectStrategy}
                      authCallback={responseMicrosoft}
                      buttonTheme="light"
                      onclick={()=>console.log("click")}
                      graphScopes={graphScopes}
                      className="w-100"
                      useLocalStorageCache={true}
                    >
                    <MicrosoftLoginButton 
                      text="Ingresar con Microsoft" 
                      style={{fontSize:"14px"}} type="button"
                      className="mt-3"/>
                    </MicrosoftLogin>
                </button>        
              </div>
              <p class="or text-secondary"><span>o también</span></p>
              <div class="email-login d-flex flex-column">
                <label for="email" className="text-secondary mb-0"><b>Email</b></label>
                <input 
                  class="form-control pt-4 pb-4 mb-3" 
                  placeholder="Ingrese su Email" 
                  name="uname"   
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <label for="psw" className="text-secondary mb-0"><b>Contraseña</b></label>
                <input 
                  class="form-control pt-4 pb-4 mb-4" 
                  type="password" 
                  placeholder="Ingrese su Contraseña" 
                  name="psw"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <button class="btn-lg w-100 mb-3 cta-btn text-white" style={{border:"none"}}>Ingresar</button>
              <a class="text-center d-block" href="#" onClick = { () => onChange()}>¿Perdió su Contraseña?</a>
          </form>
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


export default Login;