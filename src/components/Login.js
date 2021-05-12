import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import {
  GoogleLoginButton,
  MicrosoftLoginButton,
} from "react-social-login-buttons";
import logo from "../assets/img/logo.png";
import "../assets/css/css-login.css";
import { Redirect } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e, rol) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:60671/api/usuario/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    setRedirect(true);

  };

  if (redirect) {
        
    return <Redirect to="/rol" />;
   
} 
  return (
    <div className="back">
      <Form className="login-form" onSubmit={submit}>
        <div>
          <img src={logo} className="logo"></img>
        </div>
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
        <Button className="btn btn-lg btn-dark btn-block">Ingresar</Button>
        <div className="text-center pt-3">O ingresa con: </div>
        <div className="btn-group login-button">
          <MicrosoftLoginButton>Microsoft</MicrosoftLoginButton>
          <GoogleLoginButton>Google</GoogleLoginButton>
        </div>
        <div className="text-center pt-2">
          <a href="/registrarse">Registrese</a>
          <span className="pt-2"> | </span>
          <a href="/recuperar_password">Olvido su password?</a>
        </div>
      </Form>
    </div>
  );
};

export default Login;
