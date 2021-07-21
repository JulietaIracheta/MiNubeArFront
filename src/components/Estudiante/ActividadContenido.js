import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import swal from 'sweetalert';
import getQuestions from '../../services/getQuestions';
import { Cookies } from 'react-cookie';
import url from "../../url"

const ActividadContenido = (props) => {

	const [questions, setQuestions] = useState([]);
	const [showScore, setShowScore] = useState(false);
	const [x, setX] = useState(false);
	const [score, setScore] = useState(0);
	const [totalCorrectos, setTotalCorrectos] = useState(0);
	const [totalCorrectosDetalle, setTotalCorrectosDetalle] = useState(0);
	const [puntaje, setPuntaje] = useState(0);
	const [visto, setVisto] = useState(false);  
	const cookie = new Cookies();
	const jwt = cookie.get('jwt');

	useEffect(() => {
		(async () => {
			const response = await fetch(`${url.url}/api/contenido/` + props.unidad, {
				headers: { "Content-type": "application/json" },
				credentials: "include",
			});

			const f = await response.json();
			if(f.visto){
				setVisto(f.visto);
				setPuntaje(f.puntajeContenido[0].puntaje);
			}

		})();
	}, []);
	useEffect(function () {
		var t = 0;
		getQuestions(props.unidad).then((q) => {
			setQuestions(q)
			if(!q[0]) return;
			for (var i in q[0].answers) {
				if (q[0].answers[i].correct) {
					t++;
					setTotalCorrectosDetalle(t);
				}
			}
		});

	}, []);

	const submit = async (e) => {
		e.preventDefault();
		var cont = 0
		var totalDeCorrectas = 0
		for (var q in questions[0].answers) {
			if (questions[0].answers[q].correct) {
				totalDeCorrectas++;
				setTotalCorrectos(totalDeCorrectas);
			}
		}
		if (totalDeCorrectas > 1) {
			var totalSeleccionados = 0;
			for (let i = 0; i < e.target.length - 1; i++) {
				if (e.target[i].checked == true) totalSeleccionados++;
				var resultado = (e.target[i].checked && e.target[i].value)
				if (resultado === 'true') { cont++ }
			}

			if (totalSeleccionados != totalDeCorrectas || cont != totalDeCorrectas) {
				cont = 0;
				setScore(0)
			}
			else {
				setScore(cont);
			}
		} else {
			var totalSeleccionados = 0;
			for (let i = 0; i < e.target.length - 1; i++) {
				if (e.target[i].checked == true) totalSeleccionados++;
				var resultado = (e.target[i].checked && e.target[i].value)
				if (resultado === 'true') { cont++ }
			}
			if (totalSeleccionados > 1) {
				cont = 0;
				setScore(0)
			}
			else
				setScore(cont)

		}

		fetch(`${url.url}/api/puntaje/`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				idContenido: props.unidad,
				puntaje: cont,
				jwt:jwt
			}),
		}).then((response) => response.json());
		await swal("Contestó " + cont + " preguntas correctas", "Actividad realizada", "success");

	}

	return (
		<>
			<div className="container-fuid mr-auto">
			<h2>{props.titulo}</h2>
			{visto ?
				// <div className='score-section ml-auto mr-auto mt-4'>
				// 	<div className="container">
				// 	<p className="text-center text-primary">Acertaste {puntaje} de {totalCorrectosDetalle} </p>
				// 	</div>
				// </div>
				<div class="alert alert-dismissible alert-success mt-5 mt-sm-0" style={{maxWidth:"230px"}}>
					Acertaste <strong>{puntaje}</strong> de <strong>{totalCorrectosDetalle}</strong>
				</div>
				: ""
			}
			<form onSubmit={submit}>
				<div className='question-section'>
					<ol className="p-0">
						{questions.map((question, index) => (
							<>
								{/* <div className="d-flex flex-column justify-content-center text-white" style={{ width: "100%", height: "4rem", background: "#5D7392", borderRadius: "10px" }}>
									<h6 className="text-center m-0" style={{ fontSize: "1.6rem" }}>{question.content}</h6>
								</div> */}
								<div class="alert alert-dismissible alert-primary pt-5 pb-5 text-center mb-5">
									<strong>{question.content}</strong> 
								</div>
								<div id="checkboxes">
									{question.answers.map((answer) => (
										<>
											<div className="container-respuesta ">
												<input type="checkbox" name={answer.id} id={answer.id}
													value={answer.correct}
												/>
												<label className="whatever" for={answer.id}></label>
												<span className="respuesta font-weight-bold">{answer.content}</span>
											</div>
										</>
									))}
								</div>
							</>
						))}

					</ol>
				</div>
				<div className="w-100 d-flex justify-content-center mt-2">
					<button disabled={visto} type="submit" className="btn btn-outline-primary btn-lg mb-5">Enviar resultados</button>
				</div>
			</form>
			</div>
		</>
	)
}

export default ActividadContenido;
