import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import {
  GoogleLoginButton,
  MicrosoftLoginButton,
} from "react-social-login-buttons";
import logo from "../assets/img/logo.png";
import GoogleLogin from "react-google-login";
import "../assets/css/css-login.css";
import { Redirect, useHistory } from "react-router";
import { useCookies } from "react-cookie";

const Login = () => {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [cookies, setCookie] = useCookies(["usuario"]);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const responseGoogle = async (res) => {
    console.log(res)
    let emailGoogle=res.profileObj.email;
    setEmail(res.profileObj.email);
    setCookie('Name', res.profileObj.name, { path: '/' });
    setCookie('img', res.profileObj.imageUrl, { path: '/' });

    const response = await fetch("http://localhost:60671/api/usuario/loginGoogle?email="+emailGoogle, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    if(response.status === 200){
      setRedirect(true);
    }
    if(response.status===400)
      alert("Datos erróneos")
    else
      alert("Algo salió mal")
  }

  const submit = async (e, rol) => {
    e.preventDefault();

    const response = await fetch("http://localhost:60671/api/usuario/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        UsuarioNombre:email,
        password,
      }),
    })
    .then(res => {
      if (!res.ok) throw new Error('Response is NOT ok')
      return res.json()
  }).then(res => {
      console.log("login: "+ email);
    });
    setRedirect(true);
  };

  if (redirect) {
    
    return <Redirect to="/rol" />;
  }

  return (
    <div className="back">
      <Form className="login-form" onSubmit={submit}>
        <div className="logo-container">
          <img src={logo} className="logo"></img>
        </div>
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
          <div className="text-center pt-3">Ingresá con: </div>

          <GoogleLogin clientId="1008891152271-jvlq4r789kf6mlihar2uekqthgn30dob.apps.googleusercontent.com"
            buttonText="Ingresar con Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            className="w-100 mt-3" />

          <div className="text-center pt-2">
            <a href="/recuperar_password" className="text-decoration-none">¿Olvidó su contraseña?</a>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;