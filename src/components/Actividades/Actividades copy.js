import React, { useState } from 'react';
import './actividades.css'
import Sidebar from "../Estudiante/Sidebar";
import NavEstudiante from "../Estudiante/NavEstudiante";
import { Grid } from "@material-ui/core";
import BotonVolver from '../BotonVolver/botonVolver'

export default function Actividades() {
	const questions = [
		{
			questionText: 'Cuál es la capital de Francia?',
			answerOptions: [
				{ answerText: 'Nueva York', isCorrect: false },
				{ answerText: 'Londres', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Quién descubrió América?',
			answerOptions: [
				{ answerText: 'Juan Domingo Perón', isCorrect: false },
				{ answerText: 'Cristobal Colón', isCorrect: true },
				{ answerText: 'Cristobal Lopez', isCorrect: false },
				{ answerText: 'Donald Trump', isCorrect: false },
			],
		},
		{
			questionText: 'Cuántas provincias tiene Argentina?',
			answerOptions: [
				{ answerText: '23', isCorrect: true },
				{ answerText: '22', isCorrect: false },
				{ answerText: '21', isCorrect: false },
				{ answerText: '24', isCorrect: false },
			],
		},
		{
			questionText: 'Cuántos océanos hay en el mapa planisferio?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '5', isCorrect: true },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
	return (
        <div>
        <NavEstudiante />
        <div className="flex">
          <Sidebar />
          <div className="content">
          <div className="w-100 d-flex mt-4 mb-4">
          <BotonVolver ruta="/rol"></BotonVolver>
          <h1 className="m-0 p-0">Actividades Unidad 5</h1>
          </div>
              <Grid container spacing={0.5}>
		<div className='app'>
			{showScore ? (
				<div className='score-section'>
					Tu puntaje es {score} de {questions.length}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Pregunta {currentQuestion + 1}</span>/{questions.length} 
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
        </Grid>
        </div>
      </div>
    </div>
	);
}