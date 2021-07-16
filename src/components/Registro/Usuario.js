import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/usuario";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import {SidebarData}   from '../SidebarData';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Button } from "reactstrap";
import { store } from "../../actions/store";
import { Provider } from "react-redux";
import NavAdmin from "./NavAdmin";
import { Search } from "react-bootstrap-icons";
import Sidebar from "../Sidebar";
import ModalDialogDoc from "./ModalDialogDoc";
import ModalDialogEst from "./ModalDialogEst";
import ModalDialogTut from "./ModalDialogTut";
import { MoreVert } from "@material-ui/icons";
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import DocenteModalEditar from "../Modificacion/DocenteModalEditar";
import EstudianteModalEditar from "../Modificacion/EstudianteModalEditar";
import TutorModalEditar from "../Modificacion/TutorModalEditar";


const Usuarios = ({...props }) => {
  // declare a new state variable for modal open
  const [openDoc, setOpenDoc] = useState(false);
  const [openEst, setOpenEst] = useState(false);
  const [openTut, setOpenTut] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [openModalUpdateDocente, setOpenModalUpdateDocente] = useState(false);
  const [openModalUpdateEstudiante, setOpenModalUpdateEstudiante] = useState(false);
  const [openModalUpdateTutor, setOpenModalUpdateTutor] = useState(false);
  const [datos, setDatos] = useState({
    idPersona: '',
    idUsuario: '',
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    telefono: '',
    institucion: [],
    rol: ''
  });

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // function to handle modal open
  const handleOpenDoc = () => {
    setOpenDoc(true);
    setOpenEst(false);
    setOpenTut(false);
  };
  const handleOpenEst = () => {
    setOpenEst(true);
    setOpenTut(false);
    setOpenDoc(false);
  };
  const handleOpenTut = () => {
    setOpenTut(true);
    setOpenEst(false);
    setOpenDoc(false);
  };

  // function to handle modal close
  const handleClose = () => {
    setOpenDoc(false);
    setOpenEst(false);
    setOpenTut(false);
  };

  useEffect(() => {
    props.fetchAllUsuarios();
  }, []);

  const onDelete = (id) => {
    Swal.fire({
      title: 'Estas seguro de eliminarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Sí`,
    }).then((result) => {

      const onSuccess = (usuario) => {
        if(usuario === null){
          swal("Hubo un problema al querer Eliminar el usuario, intente más tarde",'' , "error");
        }else{
          swal("Usuario Eliminado Correctamente!",'' , "success");
        }
        handleMenuClose();
      };
      if (result.isConfirmed) {
        props.deleteUsuario(id, onSuccess); 
      }else{
        handleMenuClose();
        return;
      }
    })

  };

  const modalFadeState = (rol) =>{
    switch(rol){
      case 'Docente':
          setOpenModalUpdateDocente(!openModalUpdateDocente)
        break;
      case 'Estudiante':
          setOpenModalUpdateEstudiante(!openModalUpdateEstudiante)
        break;
      case 'Tutor':
          setOpenModalUpdateTutor(!openModalUpdateTutor)
        break;
      default:
        break;
    }   
  }
    
  const onChange = (record) => {
    setDatos(record)
    modalFadeState(record.rol)
  }

  return (
    <Provider store={store}>
      <NavAdmin />
      <div className="d-flex">
        <Sidebar data={SidebarData} />
        <main className="main w-100 pr-2 pt-4">
            <div className="d-flex d-sm-block justify-content-between">
              <span className="tituloadmin">Usuarios</span>
              <Button
                className="btn btn-sm paleta_bgrojo float-right m-0 mt-2 mt-md-3 d-none d-sm-block"
                onClick={handleOpenEst}
              >
                <span className="d-md-block">Add Estudiante</span>
              </Button>
              <ModalDialogEst open={openEst} handleClose={handleClose} />
              <Button
                className="btn btn-sm paleta_bgazul border float-right m-0 mt-2 mt-md-3 d-none d-sm-block"
                onClick={handleOpenDoc}
              >
                <span className="d-md-block">Add Docente</span>
              </Button>
              <ModalDialogDoc open={openDoc} handleClose={handleClose} />

              <Button
                className="btn btn-sm paleta_bgverde float-right m-0 mt-2 mt-md-3 d-none d-sm-block"
                onClick={handleOpenTut}
              >
                <span className="d-md-block">Add Tutor</span>
              </Button>
              <ModalDialogTut open={openTut} handleClose={handleClose} />
              <UncontrolledDropdown
                  direction="left"
                  nav
                  inNavbar
                  className="menu3dots d-block d-sm-none pt-2"
                >
                  <DropdownToggle nav className="p-0 text-secondary">
                    <MoreVert />
                  </DropdownToggle>
                  <DropdownMenu>                              
                    <DropdownItem
                      onClick={handleOpenEst} 
                      className="text-danger"
                    >                              
                      Add Estudiante
                    </DropdownItem>

                    <DropdownItem
                      onClick={handleOpenDoc}
                      className="text-primary"
                    >
                      Add Docente
                    </DropdownItem>

                    <DropdownItem
                      onClick={handleOpenTut}
                      className="text-success"
                    >
                      Add Tutor
                    </DropdownItem>
                  </DropdownMenu>
              </UncontrolledDropdown>
            </div>
              <Table responsive className="mt-3 d-block d-sm-table bg-white table-responsive" style={{border:"1px solid #edf2f9"}}> 
                <TableHead style={{backgroundColor:"#12263f"}}>
                  <TableRow>
                    <TableCell className="font-weight-bold text-white text-uppercase">Nombre</TableCell>
                    <TableCell className="font-weight-bold text-white text-uppercase">Apellido</TableCell>
                    <TableCell className="font-weight-bold text-white text-uppercase">Email</TableCell>
                    <TableCell className="font-weight-bold text-white text-uppercase">Teléfono</TableCell>
                    <TableCell className="font-weight-bold text-white text-uppercase">Rol</TableCell>
                    <TableCell className="font-weight-bold text-white text-uppercase"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.usuarioList.map((record, index) => {
                    return (
                      <TableRow key={index} hover>
                        <TableCell>{record.nombre}</TableCell>
                        <TableCell>{record.apellido}</TableCell>
                        <TableCell>{record.email}</TableCell>
                        <TableCell>{record.telefono}</TableCell>
                        <TableCell>{record.rol}</TableCell>
                        <TableCell>
                          <UncontrolledDropdown
                            direction="left"
                            nav
                            inNavbar
                            className="menu3dots"
                          >
                            <DropdownToggle nav className="p-0 text-secondary">
                              <MoreVert />
                            </DropdownToggle>
                            <DropdownMenu>                              
                              <DropdownItem
                                onClick={() => onChange(record)}>                              
                             Editar
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => onDelete(record.idUsuario)}
                              >
                                Eliminar
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
        </main>
        {openModalUpdateDocente && 
          <DocenteModalEditar
            open = {openModalUpdateDocente}
            datos = {datos}
            modalFadeState = {modalFadeState}
          >
          </DocenteModalEditar>
       }
      {openModalUpdateEstudiante && 
          <EstudianteModalEditar
            open = {openModalUpdateEstudiante}
            datos = {datos}
            modalFadeState = {modalFadeState}
          >
          </EstudianteModalEditar>
       } 
      {openModalUpdateTutor && 
          <TutorModalEditar
            open = {openModalUpdateTutor}
            datos = {datos}
            modalFadeState = {modalFadeState}
          >
          </TutorModalEditar>
       } 
      </div>
    </Provider>
  );
};

const mapStateToProps = (state) => ({
  usuarioList: state.usuario.list,
});

const mapActionToProps = {
  fetchAllUsuarios: actions.fetchAll,
  deleteUsuario: actions.Delete,
  updateUsuario: actions.update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(Usuarios);
