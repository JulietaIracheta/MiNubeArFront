import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/usuario";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import UsuarioForm from "./UsuarioForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import logo from '../assets/img/logo.png';



const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const Usuarios = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllUsuarios()
    }, [])//componentDidMount
    
    //toast msg.
    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Estas seguro de eliminarlo'))
            props.deleteUsuario(id,()=>addToast("Eliminado correctamente", { appearance: 'info' }))
    }
    return (

        <Paper className={classes.paper} elevation={3}>
            
            <Grid container>
            <Grid item xs={6}>
            <h1>Registro de Usuarios</h1>
            <img src={logo} className="logo"></img>
            </Grid>
                <Grid item xs={6}>
                    <UsuarioForm {...({ currentId, setCurrentId })} />
                </Grid>
                <hr className="h-divider"></hr>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Apellido</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Rol</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.usuarioList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.nombre}</TableCell>
                                            <TableCell>{record.apellido}</TableCell>
                                            <TableCell>{record.email}</TableCell>
                                            <TableCell>{record.rol}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    usuarioList: state.usuario.list
})

const mapActionToProps = {
    fetchAllUsuarios: actions.fetchAll,
    deleteUsuario: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Usuarios));