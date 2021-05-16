import React, { Component } from "react";
import { connect } from "react-redux";
import { create } from "../../actions/usuario";

class AddUsuario extends Component {
  constructor(props) {
    super(props);
    this.onChangeRol = this.onChangeRol.bind(this);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeApellido = this.onChangeApellido.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.saveUsuario = this.saveUsuario.bind(this);
    this.newUsuario = this.newUsuario.bind(this);

    this.state = {
      rol: "",
      nombre: "",
      apellido: "",
      email: "",
      password: "",

      submitted: false,
    };
  }

  onChangeRol(e) {
    this.setState({
      rol: e.target.value,
    });
  }

  onChangeNombre(e) {
    this.setState({
      nombre: e.target.value,
    });
  }
  onChangeApellido(e) {
    this.setState({
      apellido: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }


  saveUsuario() {
    const { rol, nombre, apellido, email, password } = this.state;

    this.props
      .create(rol, nombre, apellido, email, password)
      .then((data) => {
        this.setState({
          rol: data.rol,
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email,
          password: data.password,

          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newUsuario() {
    this.setState({
      rol: "",
      nombre: "",
      apellido: "",
      email: "",
      password: "",

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                required
                value={this.state.nombre}
                onChange={this.onChangeNombre}
                name="nombre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                required
                value={this.state.apellido}
                onChange={this.onChangeApellido}
                name="apellido"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                value={this.state.password}
                onChange={this.onChangePassword}
                name="password"
              />
            </div>
            <div className="form-group">
            <select>
            <option value="Estudiante">Estudiante</option>
            <option value="Docente">Docente</option>
            <option value="Tutor">Tutor</option>

            </select>
            </div>

            <button onClick={this.saveUsuario} className="btn btn-success">
              Enviar
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { create })(AddUsuario);