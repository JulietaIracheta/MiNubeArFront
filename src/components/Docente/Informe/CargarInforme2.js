import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import Sidebar from "../../Sidebar";
import { SidebarDataDocente } from "../../sideBar/SidebarDataDocente";
import NavDocente from "../NavDocente";
import { makeStyles } from "@material-ui/core/styles";
import jsPDF from "jspdf";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginLeft: 25,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CargarInforme2 = () => {
  const classes = useStyles();
  const [año, setAño] = useState();
  const [apellido, setApellido] = useState('')
  const [nombre, setNombre] = useState('')
  const [curso, setCurso] = useState('')
  const [institucion, setInstitucion] = useState('')
  const [matematica, setMatematica] = useState('')
  const [lengua, setLengua] = useState('')
  const [sociales, setSociales] = useState('')
  const [naturales, setNaturales] = useState('')
  const [estudiante, setEstudiante] = useState();
  const [estudiantes, setEstudiantes] = useState([]);
  const [observaciones, setObservaciones] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resetForm = () => {
    window.location.reload();
  };

  const printDocument = () => {
      const pdf = new jsPDF();
      pdf.setFont("times", "bolditalic");
      pdf.text("Informe", 105, 20, null, null, "center");
      pdf.text("", 20, 30)
      pdf.setFont("times", "normal");
      pdf.text(`Período: ${año}`, 20, 40 )
      pdf.text(`Institucion: ${institucion}`, 20, 50 )
      pdf.text(`Curso: ${curso}`, 20, 60 )
      pdf.text(`Apellido y Nombre: ${apellido}, ${nombre}`, 20, 70 )
      pdf.text('', 20, 80 )
      pdf.setFont("times", "bolditalic");
      pdf.text("Materias", 105, 90, null, null, "center");
      pdf.setFont("times", "normal");
      pdf.text(`Matemática: ${matematica}`, 20, 100 )
      pdf.text(`Literatura: ${lengua}`, 20, 110 )
      pdf.text(`Ciencias Sociales: ${sociales}`, 20, 120 )
      pdf.text(`Ciencias Naturales: ${naturales}`, 20, 130 )
      pdf.text('', 20, 140 )
      pdf.setFont("times", "bolditalic");
      pdf.text("Observaciones", 105, 150, null, null, "center");
      pdf.setFont("times", "normal");
      pdf.text('', 20, 140 )
      pdf.text(`${observaciones}`, 20, 160 )
      pdf.save(`${apellido}_${nombre}.pdf`);
    
  };

  const submitForm = () => {
    setIsSubmitted(!isSubmitted)
  }

  const onValueChangeAño = (event) => {
    const value = event.target.value;
    setAño(value);
  };

  const onValueChangeCurso = (event) => {
    const value = event.target.value;
    setCurso(value);
  };
  const onValueChangeInstitucion = (event) => {
    const value = event.target.value;
    setInstitucion(value);
  };
  const onValueChangeApellido = (event) => {
    const value = event.target.value;
    setApellido(value);
  };
  const onValueChangeNombre = (event) => {
    const value = event.target.value;
    setNombre(value);
  };
  const onValueChangeMatematica = (event) => {
    const value = event.target.value;
    setMatematica(value);
  };
  const onValueChangeLengua = (event) => {
    const value = event.target.value;
    setLengua(value);
  };
  const onValueChangeSociales = (event) => {
    const value = event.target.value;
    setSociales(value);
  };
  const onValueChangeNaturales = (event) => {
    const value = event.target.value;
    setNaturales(value);
  };
  const onValueChangeObservaciones = (event) => {
    const value = event.target.value;
    setObservaciones(value);
  };

  useEffect(async () => {
    const result = await fetch(
      "http://localhost:60671/api/usuario/estudiantes",
      {
        method: "GET",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        setEstudiantes(response);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:60671/api/informe/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        
      }),
    }).then((response) => response.json());
    resetForm();
  };

  return (
    <div>
      <NavDocente />

      <div className="d-flex mt-1">
        <Sidebar data={SidebarDataDocente} />
        <div className="container mt-1">
          <div>
            <h4>Crear Informe</h4>
            <hr className="hr-colorDoc mb-5" />
          </div>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <div>
                <div className="mt-4 ">
                  <Grid item xs={12} className="mb-4 ml-5  w-100 ">
                    Año :
                    <TextField name="Año" className="ml-4" value={año} onChange={onValueChangeAño} /> 
                    Institución :
                    <TextField name="curso" className="ml-4" value={institucion} onChange={onValueChangeInstitucion}/>
                    Curso :
                    <TextField name="curso" className="ml-4" value={curso} onChange={onValueChangeCurso}/>
                  </Grid>
                  <Grid item xs={12} className="mb-4 ml-5  w-100 ">
                    Apellido :
                    <TextField name="Estudiante" className="ml-4" value={apellido} onChange={onValueChangeApellido}/> 
                    Nombre :
                    <TextField name="curso" className="ml-4" value={nombre} onChange={onValueChangeNombre}/>
                  </Grid>

                  <Grid item xs={12} className=" mt-5 mb-4 ml-5">
                    {" "}
                    Matemática :
                    <TextField
                      style={{ width: 600 }}
                      className="mr-5 mb-2"
                      value={matematica} onChange={onValueChangeMatematica}
                    />{" "}
                  </Grid>
                  <Grid item xs={12} className="mb-4 ml-5  w-100 ">
                    {" "}
                    Prácticas del Lenguaje :
                    <TextField style={{ width: 600 }} className="mr-5 mb-2" value={lengua} onChange={onValueChangeLengua}/>
                  </Grid>
                  <Grid item xs={12} className="mb-4 ml-5  w-100">
                    {" "}
                    Ciencias Sociales :
                    <TextField style={{ width: 600 }} className="mr-5 mb-2" value={sociales} onChange={onValueChangeSociales}/>
                  </Grid>
                  <Grid item xs={12} className="mb-4 ml-5  w-100">
                    {" "}
                    Ciencias Naturales :
                    <TextField style={{ width: 600 }} className="mr-5 mb-2" value={naturales} onChange={onValueChangeNaturales}/>
                  </Grid>
                  <Grid item xs={12} className="mb-4 ml-5  w-100">
                    {" "}
                    Observaciones :
                    <TextField style={{ width: 600 }} className="mr-5 mb-2" value={observaciones} onChange={onValueChangeObservaciones}/>
                  </Grid>

                </div>
              </div>
              <Button
              size="small"
              type="submit"
              variant="outlined"
              className="ml-5"
              onClick={printDocument}
            >
              Grabar
            </Button>
             
            </form>
            
        
        </div>
      </div>
    </div>
  );
};

export default CargarInforme2;
