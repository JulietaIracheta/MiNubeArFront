import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/usuario";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles,
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
import Swal from 'sweetalert2';

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
    width: "100%",
    paddingTop: 0,
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});

const Usuarios = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0);
  // declare a new state variable for modal open
  const [openDoc, setOpenDoc] = useState(false);
  const [openEst, setOpenEst] = useState(false);
  const [openTut, setOpenTut] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [nombre, setNombre] = useState("");
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
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

 const reload = () => {
    window.location.reload(true);
}

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
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Eliminado!', '', 'success')
        props.deleteUsuario(id);
        handleMenuClose();
        
      }else{
        handleMenuClose();
        return;
      }
      reload();
    })

  };

  return (
    <Provider store={store}>
      <NavAdmin />
      <div className={classes.root}>
        <Sidebar data={SidebarData} />

        <main className={classes.content}>
          <div className={classes.toolbar} id="coco" />
          <div id="coco">
            <div className="adminContent">
              <span className="tituloadmin">Usuarios</span>
              <Button
                className="btn btn-danger menuadmin"
                onClick={handleOpenEst}
              >
                Nuevo Estudiante
              </Button>
              <ModalDialogEst open={openEst} handleClose={handleClose} />
              <Button
                className="btn btn-success border menuadmin"
                onClick={handleOpenDoc}
              >
                Nuevo Docente
              </Button>
              <ModalDialogDoc open={openDoc} handleClose={handleClose} />

              <Button
                className="btn btn-info menuadmin"
                onClick={handleOpenTut}
              >
                Nuevo Tutor
              </Button>
              <ModalDialogTut open={openTut} handleClose={handleClose} />

              <Search className="lupa" />
            </div>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow className="colorTab">
                    <TableCell className="colorTab">Nombre</TableCell>
                    <TableCell className="colorTab">Apellido</TableCell>
                    <TableCell className="colorTab">Email</TableCell>
                    <TableCell className="colorTab">Teléfono</TableCell>
                    <TableCell className="colorTab">Rol</TableCell>
                    <TableCell className="colorTab"></TableCell>
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
                            <DropdownToggle nav>
                              <MoreVert />
                            </DropdownToggle>
                            <DropdownMenu>                              
                              <DropdownItem
                                onClick={() => onDelete(record.idUsuario)}>                               
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
            </TableContainer>
          </div>
        </main>
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
)(withStyles(styles)(Usuarios));
