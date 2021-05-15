import React, { Component, useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { GoogleLoginButton, MicrosoftLoginButton } from 'react-social-login-buttons';
import logo from '../assets/img/logo.png';
import GoogleLogin from 'react-google-login';
import { Redirect, useHistory } from 'react-router';
import { useCookies } from 'react-cookie';

export default function Login() {
    const [cookies, setCookie] = useCookies(['usuario']);
    const history = useHistory();
    setCookie('Name', '', { path: '/' });
    setCookie('img', '', { path: '/' });
    const responseGoogle = (res) => {
       
        setCookie('Name', res.profileObj.name, { path: '/' });
        setCookie('img', res.profileObj.imageUrl, { path: '/' });
        history.push('/docente')
    }
    
    return (
        <div className="back">
            <Form className="login-form">
                <div>
                    <img src={logo} className="logo"></img>
                </div>
                <FormGroup>
                    <Input type="email" placeholder="Email"></Input>
                </FormGroup>
                <FormGroup>
                    <Input type="password" placeholder="Password"></Input>
                </FormGroup>
                <a href="/docente" className="btn btn-lg btn-dark btn-block">Ingresar</a>
                <div className="text-center pt-3">O ingresa con: </div>
                <div class="btn-group login-button">
                    <MicrosoftLoginButton>Microsoft</MicrosoftLoginButton>
                    <GoogleLogin
                        clientId="1008891152271-jvlq4r789kf6mlihar2uekqthgn30dob.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
                <div className="text-center pt-2">
                    <a href="/registrarse">Registrese</a>
                    <span className="pt-2">  |  </span>
                    <a href="/recuperar_password">Olvido su password?</a>
                </div>
            </Form>
        </div>
    )
}
