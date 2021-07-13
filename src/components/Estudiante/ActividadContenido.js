import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import getQuestions from '../../services/getQuestions';

const ActividadContenido = (props) => {
    
    const [questions, setQuestions] = useState([]);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

    useEffect(function () {
		
		getQuestions(props.unidad).then((q) => setQuestions(q));

		console.log(questions)
	}, []);

    const submit = (e) => {
		e.preventDefault();
		var cont = 0
		for(let i= 0; i<e.target.length -1; i++){
		var resultado  = (e.target[i].checked && e.target[i].value) 
			if(resultado === 'true'){cont++}
			setScore(cont)
		}

		console.log(score)

		fetch("http://localhost:60671/api/puntaje/", {
		  method: "POST",
		  headers: {
			"Content-type": "application/json",
		  },
		  body: JSON.stringify({
			puntaje : cont,
			idActividad : 8,
			IdCurso : 1,
			IdMateria : 1,
			IdEstudiante : 1

		  }),
		}).then((response) => response.json());
		

		setShowScore(true)
	}

    return (
        <>
          <h2>{props.titulo}</h2>  

		  {showScore ? (
				<div className='score-section'>
					<div className="container">
					Tu puntaje es {score} de {questions.length}
					</div>
					<div>
					<a href="/estudiante/materias/1">Volver</a>
					</div>
					</div>

			) : (

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
							<div>
							<li>
								<input type="radio" name={question.id} 
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
			)}
        </>
    )
}

export default ActividadContenido;
