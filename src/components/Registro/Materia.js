import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/materia";
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
import { store } from "../../actions/store";
import { Provider } from "react-redux";
import NavAdmin from "./NavAdmin";
import Sidebar from "../Sidebar";
import { MoreVert } from "@material-ui/icons";
import {SidebarData}   from '../SidebarData';
import MateriaForm from "./MateriaForm";
import Swal from 'sweetalert2';
import MateriaModalEditar from "./MateriaModalEditar";
import { materias } from "../../reducers/materia";



const drawerWidth = 200;

const reload = () => {
    window.location.reload(true);
}
const Materia = ({ classes, ...props }) => {
  const [openChangeModalUpdate, setOpenChangeModalUpdate] = useState(false);
  const [datos, setDatos] = useState({
    id: '',
    nombre: '',
  });

  useEffect(() => {
    props.fetchAllMaterias();
  },[materias] ); 

  const modalFadeState = () =>{
    setOpenChangeModalUpdate(!openChangeModalUpdate)
  }

  const onChange = (curso) => {
    setDatos(curso)
    modalFadeState();
    
  }

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
          props.deleteMaterias(id)
        }
        reload();
      })
  
    };
    
  return (
    <Provider store={store}>
      <NavAdmin />
      <div className="d-flex">
        <Sidebar data={SidebarData} />
        <main className="main w-100 pr-2 pt-4">
          <div className="d-flex d-sm-block flex-column flex-sm-row justify-content-between" >
              <span className="tituloadmin text-center">Materias</span>
              <div className="float-right pt-0 mr-auto ml-auto">
                  <MateriaForm />
              </div>
          </div>
              <Table className="mt-3 d-table bg-white ml-auto mr-auto" style={{border:"1px solid #edf2f9"}}>
                <TableHead style={{backgroundColor:"#12263f"}}>
                  <TableRow>
                    <TableCell className="font-weight-bold text-white text-uppercase text-center">Nombre</TableCell>
                    <TableCell className="font-weight-bold text-white text-uppercase text-center">Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.materiasList.map((record, index) => {
                    return (
                      <TableRow key={index} hover>
                        <TableCell className="text-center">{record.nombre}</TableCell>
                        <TableCell className="text-center">
                          <UncontrolledDropdown direction="center" nav inNavbar className="menu3dots">
                            <DropdownToggle nav className="p-0 text-secondary">
                              <MoreVert  />
                            </DropdownToggle>
                            <DropdownMenu >
                              <DropdownItem  onClick = { () => onChange(record)}>
                                  Editar
                                
                                </DropdownItem>
                                <DropdownItem
                                onClick={() => onDelete(record.idMateria)}>
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
        <MateriaModalEditar
          open = {openChangeModalUpdate}
          datos = {datos}
          modalFadeState = {modalFadeState}
        >
        </MateriaModalEditar>
      </div>
    </Provider>
  );
};

const mapStateToProps = (state) => ({
  materiasList: state.materias.list,
});

const mapActionToProps = {
  fetchAllMaterias: actions.fetchAll,
  deleteMaterias: actions.Delete,
  updateMaterias : actions.update
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(Materia);
