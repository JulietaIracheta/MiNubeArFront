import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/institucion";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles,
} from "@material-ui/core";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Button, Modal, ModalBody } from "reactstrap";
import { store } from "../../actions/store";
import { Provider } from "react-redux";
import NavAdmin from "./NavAdmin";
import { Search } from "react-bootstrap-icons";
import Sidebar from "../Sidebar";
import ModalDialog from "./ModalDialog";
import { MoreVert } from "@material-ui/icons";

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

const Instituciones = ({ classes, ...props }) => {
  // const [currentId, setCurrentId] = useState(0);
  // declare a new state variable for modal open
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openChangeModalUpdate, setOpenChangeModalUpdate] = useState(false);
  const [datos, setDatos] = useState({
    id: '',
    nombre: '',
    direccion: '',
    email: ''
  });
  // const opens = Boolean(anchorEl);

  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // function to handle modal open
  const handleOpen = () => {
    setOpen(true);
  };

  // function to handle modal close
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
      props.fetchAllInstituciones();
  },[]); 

  const onDelete = (id) => {
    if (window.confirm("Estas seguro de eliminarlo"))
      props.deleteInstitucion(id)
      handleMenuClose();
  };

  const modalFadeState = () =>{
    setOpenChangeModalUpdate(!openChangeModalUpdate)
  }

  const onChange = (institucion) => {
    setDatos(institucion)
    modalFadeState()
  }

  const update = () => {
    if( datos.idInstitucion !== null){
      props.updateInstitucion(datos.idInstitucion, datos);
      modalFadeState()
    }
  }

  const handleInputChange = (event) => {
    setDatos({
        ...datos,
        [event.target.name] : event.target.value
    })
  }

  return (
    <Provider store={store}>
      <NavAdmin />
      <div className={classes.root}>
        <Sidebar />
        <main className={classes.content}>
          <div className={classes.toolbar} id="coco" />
          <div id="coco">
            <div className="adminContent">
              <span className="tituloadmin">Instituciones</span>
              <Button
                className="btn btn-danger menuadmin"
                onClick={handleOpen}
              >
                Nueva Institucion
              </Button>
              <ModalDialog open={open} handleClose={handleClose} />
              
              <Search className="lupa" />
            </div>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow className="colorTab">
                    <TableCell className="colorTab">Nombre</TableCell>
                    <TableCell className="colorTab">Dirección</TableCell>
                    <TableCell className="colorTab">Email</TableCell>
                    <TableCell className="colorTab"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.institucionList.map((record, index) => {
                    return (
                      <TableRow key={index} hover>
                        <TableCell>{record.nombre}</TableCell>
                        <TableCell>{record.direccion}</TableCell>
                        <TableCell>{record.email}</TableCell>
                        <TableCell>
                          <UncontrolledDropdown direction="left" nav inNavbar className="menu3dots">
                            <DropdownToggle nav>
                              <MoreVert />
                            </DropdownToggle>
                            <DropdownMenu >
                              <DropdownItem 
                                 onClick = { () => onChange(record)}
                              >
                                  Editar
                              </DropdownItem>
                                <DropdownItem
                                onClick={() => onDelete(record.id)}>
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
        <Modal 
            isOpen={openChangeModalUpdate} 
            aria-labelledby="contained-modal-title-vcenter"
            centered
        > 
            <ModalBody className="p-3">
              <div className="form-group">
                    <label>Id</label>
                    <input type="text" name="id" className="form-control" id="id" readOnly
                           value = {datos.idInstitucion}
                    />
                </div>
                <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" name="nombre" className="form-control" id="nombre" 
                           value = {datos.nombre}
                           onChange = { handleInputChange }
                    />
                </div>
               <div className="form-group">
                    <label>Dirección</label>
                    <input type="text" name="direccion" className="form-control" id="direccion" 
                           value = {datos.direccion}
                           onChange = { handleInputChange }
                    />
                </div>
                 <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" className="form-control" id="email" 
                           value = {datos.email}
                           onChange = { handleInputChange }
                    />
                </div>
                <button type="submit" className="btn btn-outline-primary float-right ml-1 mt-2" onClick = { update }>Guardar</button>
                <button className="btn btn-secondary float-right mt-2" onClick={ modalFadeState }>Cancelar</button> 
            </ModalBody>
        </Modal>
      </div>
    </Provider>
  );
};


const mapStateToProps = (state) => ({
  institucionList: state.institucion.list,
});


const mapActionToProps = {
  fetchAllInstituciones: actions.fetchAll,
  deleteInstitucion: actions.Delete,
  updateInstitucion : actions.update,
  // getInstitucion : actions.update,
};


export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Instituciones));
