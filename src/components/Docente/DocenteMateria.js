import React, { useState, useEffect } from "react";
import { Fragment } from "react";
//import {store} from '../../actions/store'
import { Cookies } from 'react-cookie';
import axios from "axios";

import CardMateria from "../Estudiante/CardMateria";
import { Grid } from "@material-ui/core";
import "../../assets/css/fontawesome-all.css"

const baseUrl = "http://localhost:60671/api/"

const DocenteMaterias = ({ idCurso }) => {
    const cookie = new Cookies();
    const nombre = cookie.get('nombrePersona');
    const [id, setId] = useState(0);
    let listMaterias = [];
    const jwt = cookie.get('jwt');
    const url = baseUrl + 'materias/getMateriasDocente/' + idCurso + "?jwt="+ jwt;
    const [materias, setMaterias] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        const result = await fetch(url, {
            method: 'GET',
            headers: { "Content-type": "application/json" },
            credentials: "include",
        }).then(function (response) {
            return response.json();
        })
        .then(response => {
            setMaterias(response);
            setLoading(true);
        }).catch(error => {
            console.log("getMateriasError: ");
            console.log(error);
        });
    }, [])

    if (loading) {
        try {
            listMaterias = materias.map((materia, key) => (
                <CardMateria nombre={materia.nombre} icon={materia.icon} url="/video"class="docente" key={key} />
            ));
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Fragment>
            <Grid container spacing={3}>
                {loading ? (listMaterias) : "LOADING ..."}
            </Grid>
        </Fragment>
    );
};

export default DocenteMaterias;