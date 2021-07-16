import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/institucion";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Button} from "reactstrap";
import { store } from "../../actions/store";
import { Provider } from "react-redux";
import NavAdmin from "./NavAdmin";
import Sidebar from "../Sidebar";
import ModalDialog from "./ModalDialog";
import { MoreVert } from "@material-ui/icons";
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import {SidebarData}   from '../SidebarData';
import InstitucionModalEditar from "./InstitucionModalEditar";
import { institucion } from "../../reducers/institucion";

const drawerWidth = 200;

const Instituciones = ({ classes, ...props }) => {
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
  },[institucion]); 


  const onDelete = (id) => {
    Swal.fire({
      title: 'Estas seguro de eliminarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Sí`,
    }).then((result) => {

      const onSuccess = (dato) => {
        if(dato === null){
          swal("Hubo un problema al querer Eliminar la Institución, intente más tarde",'' , "error");
        }else{
          swal("Institución Eliminada Correctamente!",'' , "success");
        }
        handleMenuClose();
      };
      if (result.isConfirmed) {
        props.deleteInstitucion(id, onSuccess)
      }else{
        handleMenuClose();
        return;
      }
    })

  };

  const modalFadeState = () =>{
    setOpenChangeModalUpdate(!openChangeModalUpdate)
  }

  const onChange = (institucion) => {
    setDatos(institucion)
    modalFadeState();
  }

  return (
    <Provider store={store}>
      <NavAdmin />
      <div className="d-flex">
        <Sidebar data={SidebarData} />
        <main className="main w-100 pr-2 pt-4">
            <div>
              <span className="tituloadmin">Instituciones</span>
              <Button
                className="btn-sm float-right mt-1 mt-md-3"
                color="primary"
                onClick={handleOpen}
              >
                Nueva Institución
              </Button>
              <ModalDialog open={open} handleClose={handleClose} />
            </div>
              <Table responsive className="mt-3 d-block d-sm-table bg-white table-responsive" style={{border:"1px solid #edf2f9"}}>
                <TableHead style={{backgroundColor:"#12263f"}}>
                  <TableRow>
                    <TableCell className="font-weight-bold text-white">NOMBRE</TableCell>
                    <TableCell className="font-weight-bold text-white">DIRECCIÓN</TableCell>
                    <TableCell className="font-weight-bold text-white">EMAIL</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.institucionList.map((record, index) => {
                    return (
                      <TableRow key={index} hover>
                        <TableCell className="text-dark">{record.nombre}</TableCell>
                        <TableCell className="text-dark">{record.direccion}</TableCell>
                        <TableCell className="text-dark">{record.email}</TableCell>
                        <TableCell> 
                          <UncontrolledDropdown direction="left" className="menu3dots">
                            <DropdownToggle nav className="p-0 text-secondary">
                              <MoreVert />
                            </DropdownToggle>
                            <DropdownMenu >
                              <DropdownItem 
                                 onClick = { () => onChange(record)}
                              >
                                  Editar
                              </DropdownItem>
                                <DropdownItem
                                  onClick={() => onDelete(record.idInstitucion)}
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
        <InstitucionModalEditar
          open = {openChangeModalUpdate}
          datos = {datos}
          modalFadeState = {modalFadeState}
        >
        </InstitucionModalEditar>
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
};


export default connect(
  mapStateToProps,
  mapActionToProps
)(Instituciones);
