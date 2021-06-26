import React, { useEffect, useState } from 'react';
import ModalDialogComunicado from './ModalDialogComunicado';
import getComunicados from '../../services/comunicados/getComunicados';
import '../../assets/css/comunicados/comunicados.css';
import { store } from "../../actions/store";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import * as actions from "../../actions/comunicado";
import { withStyles } from "@material-ui/core";
import ChatRoom from '../Chat/ChatRoom';
const drawerWidth = 200;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    top: "unset !important",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    margin: 0,
    paddingTop: 0,
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});
const Comunicado = ({ idCurso, ...props }) => {
  const [dialogComunicado, setDialogComunicado] = useState(false);
  const [comunicados, setComunicados] = useState([]);

  useEffect(async function () {
    props.fetchAllComunicado();
  }, []);

  const clickNuevoComunicado = () => {
    setDialogComunicado(true);
  };
  const cerrarModal = () => {
    setDialogComunicado(false);
  };
  return <div>
    <Provider store={store}>
      <div className="container-fluid">
        <div className="row comunicados-container" style={{ border: "1px solid #707070" }}>
          <div className="col-md-3">
            <div className="w-100 d-flex flex-column py-3">
              <button className="btn btn-outline-dark btn-lg" onClick={clickNuevoComunicado}>Nuevo +</button>
            </div>
            <ModalDialogComunicado open={dialogComunicado} handleClose={cerrarModal} idCurso={idCurso} />
          </div>

          <div className="col-md-9 py-3 h-100 comunicados-overflow" style={{ borderLeft: "1px solid #707070" }}>
            {props.comunicadosList.map((c, index) => {
              return <div key={index}>
                {Array.isArray(c) ?
                  c.map((com, index) => {
                    return <div key={index}>
                      <div className="d-flex flex-column mt-3" style={{ borderBottom: "1px solid #707070" }}>
                        <span style={{ fontSize: "14px", color: "#2d2f85" }} className="font-weight-bold">Para:
                          {com.nombreApellidoEstudiante}
                        </span>
                        <span>{com.fecha}</span>
                        <p>{com.descripcion}</p>
                      </div>
                    </div>
                  })
                  : <div className="d-flex flex-column mt-3" style={{ borderBottom: "1px solid #707070" }}>
                    <span style={{ fontSize: "14px", color: "#2d2f85" }} className="font-weight-bold">Para:
                      {c.nombreApellidoEstudiante}
                    </span>
                    <span>{c.fecha}</span>
                    <p>{c.descripcion}</p>
                  </div>
                }
              </div>
            })}
          </div>
        </div>
      </div>
    </Provider>
  </div>
}

const mapStateToProps = (state) => ({
  comunicadosList: state.comunicados.list,
});


const mapActionToProps = {
  createComunicado: actions.create,
  updateComunicado: actions.update,
  fetchAllComunicado: actions.fetchAll,
};


export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Comunicado));
