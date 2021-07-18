import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import Sidebar from "../Sidebar";
import { SidebarDataDocente } from "../sideBar/SidebarDataDocente";
import NavDocente from "../Docente/NavDocente";
import { makeStyles } from "@material-ui/core/styles";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../../App.css";
import url from "../../url"

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginLeft: 25,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CargarInforme = () => {
  const classes = useStyles();
  const [año, setAño] = useState();
  const [estudiante, setEstudiante] = useState();
  const [estudiantes, setEstudiantes] = useState([]);
  const [informe, setInforme] = useState("");

  const resetForm = () => {
    window.location.reload();
  };

  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("download.pdf");
    });
  };

  const onValueChangeAño = (event) => {
    const value = event.target.value;
    setAño(value);
  };

  const onValueChangeEstudiante = (event) => {
    const value = event.target.value;
    setEstudiante(value);
  };
  const onValueChangeInforme = (event) => {
    const value = event.target.value;
    setInforme(value);
  };

  useEffect(async () => {
    const result = await fetch(
      `${url.url}/api/usuario/estudiantes`,
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
    const response = await fetch(`${url.url}/api/informe/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        año: año,
        idEstudiante: estudiante,
        informe: informe,
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
            <h4>Carga de Informe</h4>
            <hr className="hr-colorDoc mb-5" />
          </div>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <div>
              <div id="divToPrint" className="mt-4 ">
                <Grid item xs={8} className="mb-4 ml-5  w-100 ">
                  Escuela :
                  <TextField name="Estudiante" className="ml-4" /> Curso :
                  <TextField name="curso" className="ml-4" />
                </Grid>
                <Grid item xs={12} className="mb-4 ml-5  w-100 ">
                  Apellido :
                  <TextField name="Estudiante" className="ml-4" /> Nombre :
                  <TextField name="curso" className="ml-4" />
                </Grid>

                <Grid item xs={12} className=" mt-5 mb-4 ml-5">
                  {" "}
                  Matemática :
                  <TextField
                    style={{ width: 600 }}
                    className="mr-5 mb-2"
                  />{" "}
                </Grid>
                <Grid item xs={12} className="mb-4 ml-5  w-100 ">
                  {" "}
                  Prácticas del Lenguaje :
                  <TextField style={{ width: 600 }} className="mr-5 mb-2" />
                </Grid>
                <Grid item xs={12} className="mb-4 ml-5  w-100">
                  {" "}
                  Ciencias Sociales :
                  <TextField style={{ width: 600 }} className="mr-5 mb-2" />
                </Grid>
                
              </div>
              <Button
                size="small"
                type="submit"
                variant="outlined"
                className="ml-5"
                onClick={printDocument}
              >
                Enviar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CargarInforme;
