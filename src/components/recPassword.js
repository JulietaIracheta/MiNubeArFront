import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import logo from "../assets/img/logo.png";
import "../assets/css/css-login.css";
import { Redirect } from "react-router";
import url from "../url"

const RecPassword = () => {
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);


  const submit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${url.url}/api/usuario/modificarPassword`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        UsuarioNombre: email,
        password,
      }),
    });
    setRedirect(true);

  };

  if (redirect) {
    
    return <Redirect to="/login" />;
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
          <Button className="btn btn-lg boton-login btn-block">Modificar Password</Button>
          </div>
      </Form>
    </div>
  );
};

export default RecPassword;