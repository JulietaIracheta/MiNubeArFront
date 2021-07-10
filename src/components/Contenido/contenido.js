import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ReactPlayer from 'react-player';
import { Link } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import { ToastProvider } from 'react-toast-notifications';
import VisibilityIcon from '@material-ui/icons/Visibility';

import {
    Grid,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@material-ui/core";
import swal from 'sweetalert';
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function RecipeReviewCard({ id, idCurso, idMateria, unidad, descripcion, titulo, video, actividad }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const url = "http://localhost:60671/videos/" + video;
    const [abrirModalCrearActividad, setAbrirModalCrearActividad] = React.useState(false);
    const [abrirDetalleActividad, setAbrirDetalleActividad] = React.useState(false);
    const [detalleActividad, setDetalleActividad] = React.useState();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [question, setQuestion] = useState("");
    const [answer, setAnswers] = useState([{ content: "", correct: false }]);
    const [answers1, setAnswers1] = useState("");
    const [answers2, setAnswers2] = useState("");
    const [answers3, setAnswers3] = useState("");
    const [correct1, setCorrect1] = useState(false);
    const [correct2, setCorrect2] = useState(false);
    const [correct3, setCorrect3] = useState(false);
    const [materias, setMaterias] = useState([]);
    const [cursos, setCursos] = useState([]);

    const onValueChangePregunta = (event) => {
        const value = event.target.value;
        setQuestion(value);
    };

    const resetForm = () => {
        window.location.reload();
    };
    const checked1 = () => {
        setCorrect1(true);
    };
    const checked2 = () => {
        setCorrect2(true);
    };
    const checked3 = () => {
        setCorrect3(true);
    };
    const onValueChangeRespuesta = (event) => {
        const value = event.target.value;
        setAnswers1(value);
    };
    const onValueChangeRespuesta1 = (event) => {
        const value = event.target.value;
        setAnswers2(value);
    };
    const onValueChangeRespuesta2 = (event) => {
        const value = event.target.value;
        setAnswers3(value);
        setAnswers([answers1, answers2, answers3]);
    };

    useEffect(async () => {
        const result = await fetch('http://localhost:60671/api/cursos', {
            method: 'GET',
            headers: { "Content-type": "application/json" },
            credentials: "include",
        }).then(function (response) {
            return response.json();
        })
            .then(response => {
                setCursos(response);

            });
    }, [])

    useEffect(async () => {
        const result = await fetch('http://localhost:60671/api/materias', {
            method: 'GET',
            headers: { "Content-type": "application/json" },
            credentials: "include",
        }).then(function (response) {
            return response.json();
        })
            .then(response => {
                setMaterias(response);

            });
    }, [])
    const eliminarActividad = async () => {
        const response = await fetch("http://localhost:60671/api/contenido?id=" + id, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            }
        }).then((response) => {
            return response;
        });
        if (response.ok) {
            await swal("Contenido eliminado", '', "success");
            window.location.reload();
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:60671/api/question/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                content: question,
                answers: [
                    { content: answers1, correct: correct1 },
                    { content: answers2, correct: correct2 },
                    { content: answers3, correct: correct3 },
                ],
                actividadesquiz: {
                    unidad: unidad,
                    titulo: titulo,
                    descripcion: descripcion,
                    idMateria: idMateria,
                    idCurso: idCurso,
                    idContenido: id
                },

            }),
        }).then((response) => response.json());
        resetForm();
    };
    return (
        <Card className={classes.root}>
            <ReactPlayer url={url} controls width="100%" height="12rem" style={{ minHeight: "12rem" }} />
            <CardContent>
                <span>Unidad - {unidad}</span>
                <p className="font-weight-bold">{titulo}</p>
                <p>{descripcion}</p>
            </CardContent>
            <CardActions disableSpacing>
                <p className="color-docente font-weight-bold m-0">ACTIVIDAD</p>
                <div className="w-100 d-flex justify-content-end">
                    {
                        actividad.length ?
                            <div>

                                <IconButton>
                                    <VisibilityIcon onClick={() => { setAbrirDetalleActividad(true); setDetalleActividad(actividad) }} />
                                </IconButton>
                                <IconButton>
                                    <DeleteIcon onClick={eliminarActividad} />
                                </IconButton>
                            </div>
                            :
                            <IconButton>
                                <AddIcon onClick={() => setAbrirModalCrearActividad(true)} />
                            </IconButton>
                    }
                </div>
            </CardActions>


            <Dialog open={abrirModalCrearActividad} maxWidth="800">
                <ToastProvider >
                    <div className="d-flex w-100 p-5">
                        <form
                            autoComplete="off"
                            noValidate
                            className="w-100"
                            onSubmit={handleSubmit}
                        >
                            <h5 className="mb-4">Carga de Actividad</h5>
                            <Grid container spacing={3}>
                                <Grid item md={6} xl={6} lg={6} xs={6}>
                                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label" >Curso</InputLabel>
                                        <Select
                                            name="idCurso"
                                            id="demo-simple-select-outlined"
                                            value={idCurso}
                                            label="Curso"
                                            disabled
                                        >
                                            {cursos.map((record) => (
                                                <MenuItem value={record.idCurso}>
                                                    {record.nombre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xl={6} lg={6} xs={6}>
                                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label" >Materia</InputLabel>
                                        <Select
                                            name="idMateria"
                                            id="demo-simple-select-outlined"
                                            value={idMateria}
                                            label="Materia"
                                            disabled
                                        >
                                            {materias.map((record) => (
                                                <MenuItem value={record.idMateria}>
                                                    {record.nombre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xl={6} lg={6} xs={12} className="mt-4">
                                    <TextField
                                        name="unidad"
                                        variant="outlined"
                                        label="Unidad"
                                        value={unidad}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item md={6} xl={6} lg={6} xs={12} className="mt-4">
                                    <TextField
                                        name="titulo"
                                        variant="outlined"
                                        label="Titulo"
                                        value={titulo}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item md={12} xl={12} lg={12} xs={12} className="mt-4">
                                    <TextField
                                        fullWidth
                                        name="question"
                                        variant="outlined"
                                        label="Pregunta"
                                        value={question}
                                        onChange={onValueChangePregunta}

                                    />
                                </Grid>

                                {/*respuestas*/}

                                <Grid item md={6} xl={6} lg={6} xs={6} className="mt-4">
                                    <TextField
                                        fullWidth
                                        name="respuesta"
                                        variant="outlined"
                                        label="Respuesta"
                                        value={answers1.content}
                                        onChange={onValueChangeRespuesta}
                                    />
                                </Grid>
                                <Grid item md={6} xl={6} lg={6} xs={6} className="mt-4">
                                    <FormControlLabel
                                        fullWidth
                                        control={<Checkbox name="checked1" onChange={checked1} />}
                                        label="Correcto"
                                    />
                                </Grid>

                                <Grid item md={6} xl={6} lg={6} xs={6} className="mt-4">
                                    <TextField
                                        fullWidth
                                        className=""
                                        name="respuesta"
                                        variant="outlined"
                                        label="Respuesta"
                                        value={answers2.content}
                                        onChange={onValueChangeRespuesta1}

                                    />
                                </Grid>
                                <Grid item md={6} xl={6} lg={6} xs={6} className="mt-4">
                                    <FormControlLabel
                                        control={<Checkbox name="checked2" onChange={checked2} />}
                                        label="Correcto"
                                    />
                                </Grid>

                                <Grid item md={6} xl={6} lg={6} xs={6} className="mt-4">
                                    <TextField
                                        fullWidth
                                        name="respuesta"
                                        variant="outlined"
                                        label="Respuesta"
                                        value={answers3.content}
                                        onChange={onValueChangeRespuesta2}
                                    />
                                </Grid>
                                <Grid item md={6} xl={6} lg={6} xs={6} className="mt-4">
                                    <FormControlLabel
                                        control={<Checkbox name="checked3" onChange={checked3} />}
                                        label="Correcto"
                                    />
                                </Grid>
                                <Grid item md={6} xl={6} lg={6} xs={12} className="mt-4">
                                    <Button
                                        fullWidth
                                        type="submit"
                                        variant="outlined"
                                    >
                                        Guardar
                                    </Button>
                                </Grid>
                                <Grid item md={6} xl={6} lg={6} xs={12} className="mt-4">
                                    <Button
                                        fullWidth
                                        type="button"
                                        color="secondary"
                                        onClick={() => setAbrirModalCrearActividad(false)}
                                    >
                                        Cancelar
                                    </Button>
                                </Grid>
                            </Grid>

                        </form>
                    </div>
                </ToastProvider>
            </Dialog>

            <Dialog open={abrirDetalleActividad} maxWidth="800">
            {detalleActividad? 
                <ToastProvider >
                    <div className="d-flex w-100 p-5">
                        <form
                            autoComplete="off"
                            noValidate
                            className="w-100"
                            onSubmit={handleSubmit}
                        >
                            <h5 className="mb-4">Actividad</h5>
                            <Grid container spacing={3}>
                                <Grid item md={6} xl={6} lg={6} xs={6}>
                                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label" >Curso</InputLabel>
                                        <Select
                                            name="idCurso"
                                            id="demo-simple-select-outlined"
                                            value={idCurso}
                                            label="Curso"
                                            disabled
                                        >
                                            {cursos.map((record) => (
                                                <MenuItem value={record.idCurso}>
                                                    {record.nombre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xl={6} lg={6} xs={6}>
                                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label" >Materia</InputLabel>
                                        <Select
                                            name="idMateria"
                                            id="demo-simple-select-outlined"
                                            value={idMateria}
                                            label="Materia"
                                            disabled
                                        >
                                            {materias.map((record) => (
                                                <MenuItem value={record.idMateria}>
                                                    {record.nombre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xl={6} lg={6} xs={12} className="mt-4">
                                    <TextField
                                        name="unidad"
                                        variant="outlined"
                                        label="Unidad"
                                        value={unidad}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item md={6} xl={6} lg={6} xs={12} className="mt-4">
                                    <TextField
                                        name="titulo"
                                        variant="outlined"
                                        label="Titulo"
                                        value={titulo}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={12} xl={12} lg={12} xs={12} className="mt-4">
                                    <TextField
                                        fullWidth
                                        name="question"
                                        variant="outlined"
                                        label="Pregunta"
                                        value={detalleActividad[0].questions[0].content}
                                        disabled
                                    />
                                </Grid>
                                {/*respuestas*/}

                                <Grid item md={6} xl={6} lg={6} xs={6} className="mt-4">
                                    <TextField
                                        fullWidth
                                        name="respuesta"
                                        variant="outlined"
                                        label="Respuesta"
                                        value={detalleActividad[0].questions[0].answers[0].content}
                                        disabled
                                    />
                                </Grid>
                                <Grid item md={6} xl={6} lg={6} xs={6} className="mt-4">
                                    <FormControlLabel
                                        fullWidth
                                        disabled
                                        control={<Checkbox name="checked1" checked={detalleActividad[0].questions[0].answers[0].correct} />}
                                        label="Correcto"
                                    />
                                </Grid>

                                <Grid item md={6} xl={6} lg={6} xs={6} className="mt-4">
                                    <TextField
                                        fullWidth
                                        className=""
                                        name="respuesta"
                                        variant="outlined"
                                        disabled
                                        label="Respuesta"
                                        value={detalleActividad[0].questions[0].answers[1].content}                                      
                                    />
                                </Grid>
                                <Grid item md={6} xl={6} lg={6} xs={6} className="mt-4">
                                    <FormControlLabel
                                        disabled
                                        control={<Checkbox name="checked2" checked={detalleActividad[0].questions[0].answers[1].correct} />}
                                        label="Correcto"
                                    />
                                </Grid>

                                <Grid item md={6} xl={6} lg={6} xs={6} className="mt-4">
                                    <TextField
                                        fullWidth
                                        name="respuesta"
                                        disabled
                                        variant="outlined"
                                        label="Respuesta"
                                        value={detalleActividad[0].questions[0].answers[2].content}/>
                                </Grid>
                                <Grid item md={6} xl={6} lg={6} xs={6} className="mt-4">
                                    <FormControlLabel
                                        disabled
                                        control={<Checkbox name="checked3" checked={detalleActividad[0].questions[0].answers[2].correct} />}
                                        label="Correcto"
                                    />
                                </Grid>
                              
                                <Grid item md={6} xl={6} lg={6} xs={12} className="mt-4">
                                    <Button
                                        fullWidth
                                        type="button"
                                        color="secondary"
                                        onClick={() => setAbrirDetalleActividad(false)}
                                    >
                                        Cancelar
                                    </Button>
                                </Grid>
                            </Grid>

                        </form>
                    </div>
                </ToastProvider>
                    : ""
                }

            </Dialog>
        </Card >
    );
}
