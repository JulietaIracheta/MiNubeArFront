import React, { useEffect, useState } from 'react';
import './actividades.css'
import Sidebar from "../Estudiante/Sidebar";
import NavEstudiante from "../Estudiante/NavEstudiante";
import { Grid } from "@material-ui/core";
import BotonVolver from '../BotonVolver/botonVolver'
import getQuestions from '../../services/getQuestions';


export default function Actividades() {
	
	const [questions, setQuestions] = useState([]);
	const [showScore, setShowScore] = useState(false);
	const [value, setValue] = useState(false);
	const [score, setScore] = useState(0);

	useEffect(function () {
		getQuestions().then((q) => setQuestions(q));
		console.log(questions)  
	}, []);

	const onValueChange = (event) => {
		if(event.target.value === 'true'){
			setScore(score+1)
		};
	}
	const submit = () => {
		setShowScore(true)
	}

	return (
        <div>
        <NavEstudiante />
        <div className="flex">
          <Sidebar />
          <div className="content">
          <div className="w-100 d-flex mt-4 mb-4">
          <BotonVolver ruta="/rol"></BotonVolver>
          <h1 className="m-0 p-0">Actividades Unidad 1</h1>
          </div>
              <Grid container spacing={0.5}>
		<div className='app'>
		{showScore ? (
				<div className='score-section'>
					<div className="container">
					Tu puntaje es {score} de {questions.length}
					</div>
					<div>
					<a href="/actividades">Volver</a>
					</div>
					</div>

			) : (
				<>
				
				<form onSubmit={submit}>
					<div className='question-section'>
						<div className='question-count'>
							<span>Preguntas</span>{":  "} {questions.length} 
						</div>
						<ol>
						{questions.map((question) => (
						
							<li>{question.content}
						<ol type="a">
						{question.answers.map((answer) => (
							<div  onChange={onValueChange}>
							<li>
								<input type="radio" name={"question_ " + question.id} 
								value={answer.correct}
								/>
								{answer.content}</li></div>		
						))}
						
						</ol>
						</li>
						
					))}</ol>
					{console.log({score})}
					</div>
					<input type="submit" />		
					</form>
				</>
)}
		</div>
        </Grid>
        </div>
      </div>
    </div>
	);
}