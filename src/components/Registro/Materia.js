import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/materia";
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
import { store } from "../../actions/store";
import { Provider } from "react-redux";
import NavAdmin from "./NavAdmin";
import Sidebar from "../Sidebar";
import { MoreVert } from "@material-ui/icons";
import {SidebarData}   from '../SidebarData';
import MateriaForm from "./MateriaForm";
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
    paddingTop: 0,
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});

const reload = () => {
    window.location.reload(true);
}
const Materia = ({ classes, ...props }) => {
  useEffect(() => {
    props.fetchAllMaterias();
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
          props.deleteMaterias(id)
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
              <span className="tituloadmin">Materias</span>
              <div className="agregarcurso">
           <MateriaForm />
              </div>
            <TableContainer style={{overflow:"unset"}}>
              <Table>
                <TableHead>
                  <TableRow className="colorTab">
                    <TableCell className="colorTab">Nombre</TableCell>
                    <TableCell className="colorTab"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.materiasList.map((record, index) => {
                    return (
                      <TableRow key={index} hover>
                        <TableCell>{record.nombre}</TableCell>
                        <TableCell className="d-flex flex-row-reverse w-100">
                          <UncontrolledDropdown direction="left" nav inNavbar className="menu3dots">
                            <DropdownToggle nav >
                              <MoreVert  />
                            </DropdownToggle>
                            <DropdownMenu >
                              <DropdownItem>
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
            </TableContainer>
          </div>
          </div>
        </main>
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
)(withStyles(styles)(Materia));
