import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/curso";
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
import CursoForm from "./CursoForm";
import Swal from 'sweetalert2';

const drawerWidth = 200;

const reload = () => {
    window.location.reload(true);
}
const Curso = ({ ...props }) => {

  useEffect(() => {
    props.fetchAllCursos();
  },[] ); 

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
          props.deleteCursos(id)
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
          <div className="d-flex d-sm-block flex-column  flex-sm-row justify-content-between">
              <span className="tituloadmin text-center">Cursos</span>
              <div className="float-right pt-0 mr-auto ml-auto">
                  <CursoForm />
              </div>
          </div>
              <Table className=" mt-3 d-table bg-white ml-auto mr-auto" style={{border:"1px solid #edf2f9"}}>
                <TableHead style={{backgroundColor:"#12263f"}}>
                  <TableRow>
                    <TableCell className="font-weight-bold text-white text-uppercase text-center">Nombre</TableCell>
                    <TableCell className="font-weight-bold text-white text-uppercase text-center">Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.cursosList.map((record, index) => {
                    return (
                      <TableRow key={index} hover>
                        <TableCell className="text-center">{record.nombre}</TableCell>
                        <TableCell className="text-center">
                          <UncontrolledDropdown direction="center" nav  className="menu3dots">
                            <DropdownToggle nav className="p-0 text-secondary">
                              <MoreVert />
                            </DropdownToggle>
                            <DropdownMenu >
                              <DropdownItem  
                              >
                                  Editar
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => onDelete(record.idCurso)}>
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
      </div>
    </Provider>
  );
};

const mapStateToProps = (state) => ({
  cursosList: state.cursos.list,
});

const mapActionToProps = {
  fetchAllCursos: actions.fetchAll,
  deleteCursos: actions.Delete,
  updateCursos : actions.update
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(Curso);
