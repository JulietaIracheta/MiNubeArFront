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

  const responseGoogle = (res) => {
    console.log(res)
    setCookie('Name', res.profileObj.name, { path: '/' });
    setCookie('img', res.profileObj.imageUrl, { path: '/' });
    history.push('/rol')
}

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
          <GoogleLoginButton clientId="1008891152271-jvlq4r789kf6mlihar2uekqthgn30dob.apps.googleusercontent.com"
                        buttonText="Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'} />
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
