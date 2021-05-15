import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/usuario";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import UsuarioForm from "./UsuarioForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";



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
            </Grid>
                <Grid item xs={6}>
                    <UsuarioForm {...({ currentId, setCurrentId })} />
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