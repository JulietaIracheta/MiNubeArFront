import React, {useState} from "react";
import {
  Grid,
  TextField,
Button,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";
import Sidebar from "../Sidebar";
import { SidebarDataDocente } from '../sideBar/SidebarDataDocente';
import NavDocente from '../Docente/NavDocente'

const CrearActividad = () => {

    const [question, setQuestion] = useState('');
    const [answer, setAnswers] = useState([{content : '', correct : false}]);
    const [answers1, setAnswers1] = useState('');
    const [answers2, setAnswers2] = useState('');
    const [answers3, setAnswers3] = useState('');
    const [correct1, setCorrect1] = useState(false);
    const [correct2, setCorrect2] = useState(false);
    const [correct3, setCorrect3] = useState(false);

	const onValueChangePregunta = (event) => {
		const value = event.target.value	
        setQuestion(value)
		};

    const resetForm = () => {
        window.location.reload();
    }    
	const checked1 = () => {
        setCorrect1(true)
    }
    const checked2 = () => {
        setCorrect2(true)
    }
    const checked3 = () => {
        setCorrect3(true)
    }
    const onValueChangeRespuesta = (event) => {
        const value = event.target.value
        setAnswers1(value)
    };
    const onValueChangeRespuesta1 = (event) => {
        const value = event.target.value
        setAnswers2(value)
    };
    const onValueChangeRespuesta2 = (event) => {
        const value = event.target.value
        setAnswers3(value)
        setAnswers([answers1,answers2,answers3])
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:60671/api/question/", {
      method: "POST",
      headers: { 
          "Content-type": "application/json"
        },
      body:JSON.stringify({
          content : question,
          answers : [
              {content : answers1, correct : correct1},
              {content : answers2, correct : correct2},
              {content : answers3, correct : correct3},  
        ]
}),
}).then(response => response.json());
    resetForm();
    }

return (
    <div>
        <NavDocente />
    
    <div className="d-flex mt-1">
      <Sidebar data={SidebarDataDocente} />
      <div className="container cardContainer ">
        <div>
            <h4>Crear Actividad</h4>
        <hr className="hr-colorDoc" />
      <h6 className="mt-5 mb-5">Complete el formulario para crear actividad (tilde la respuesta correcta) </h6>
      
      </div>
<form
autoComplete="off"
noValidate
onSubmit={handleSubmit}
>
<div style={{
    display: "inline-block", 
    justifyContent: "center"
    }}
>
  <Grid item xs={12} className="mb-4">
    <TextField
      name="question"
      variant="outlined"
      label="Pregunta"
      value={question}
      onChange={onValueChangePregunta}
    />
  </Grid>
  <Grid item xs={12} className="mb-4">
    <TextField
      name="respuesta"
      variant="outlined"
      label="Respuesta"
      value={answers1.content}
      onChange={onValueChangeRespuesta}

    />
 <FormControlLabel control={<Checkbox name="checked1" onChange={checked1}/>} label="Correcto/Incorrecto" className="ml-3"/>
  </Grid>
  <Grid item xs={12} className="mb-4">
          <TextField
      name="respuesta"
      variant="outlined"
      label="Respuesta"
      value={answers2.content}
      onChange={onValueChangeRespuesta1}

    />
 <FormControlLabel control={<Checkbox name="checked2" onChange={checked2}/>} label="Correcto/Incorrecto" className="ml-3" / >
    </Grid>

    <Grid item xs={12} className="mb-4">
<TextField
      name="respuesta"
      variant="outlined"
      label="Respuesta"
      value={answers3.content}
      onChange={onValueChangeRespuesta2}

    />    
 <FormControlLabel control={<Checkbox name="checked3" onChange={checked3}/>} label="Correcto/Incorrecto" className="ml-3"/>
    </Grid>
    </div>
    <div>
    <Button size="small" type="submit" variant="outlined"
      >
        Enviar
      </Button>
      
    </div>
    </form>
    </div>
    </div>
    </div>
)}

export default CrearActividad;
