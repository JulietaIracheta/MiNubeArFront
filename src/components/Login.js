import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input} from 'reactstrap'; 
import { GoogleLoginButton, MicrosoftLoginButton} from 'react-social-login-buttons';
import logo from '../assets/img/logo.png';

export default class Login extends Component {
    render() {
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
                <MicrosoftLoginButton>Microsoft</MicrosoftLoginButton><GoogleLoginButton>Google</GoogleLoginButton>
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
}
