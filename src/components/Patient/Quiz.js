import React, { useState } from 'react';
import { send_self_Assesment } from '../../services/loginAPI';


const Quiz = ({ refresh }) => {

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [errorMessage, setErrorMessage] = useState("");
	const [displayResult, setDisplayResult] = useState(false);
	const [startQuiz, setStartQuiz] = useState(true);
	const [result, setResult] = useState([]);

	const questions = [
		{
			questionText: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Little interest or pleasure in doing things?',
			answerOptions: [
				{ answerText: 'Not At All' },
				{ answerText: 'Several Days' },
				{ answerText: 'More Than Half the Days' },
				{ answerText: 'Nearly Every Day' },
			],
		},
		{
			questionText: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling down, depressed or hopless?',

			answerOptions: [
				{ answerText: 'Not At All' },
				{ answerText: 'Several Days' },
				{ answerText: 'More Than Half the Days' },
				{ answerText: 'Nearly Every Day' },
			],
		},
		{
			questionText: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Trouble falling asleep, staying asleep, or sleeping too much?',
			answerOptions: [
				{ answerText: 'Not At All' },
				{ answerText: 'Several Days' },
				{ answerText: 'More Than Half the Days' },
				{ answerText: 'Nearly Every Day' },
			],
		},
		{
			questionText: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling tired or having little energy?',
			answerOptions: [
				{ answerText: 'Not At All' },
				{ answerText: 'Several Days' },
				{ answerText: 'More Than Half the Days' },
				{ answerText: 'Nearly Every Day' },
			],
		},
		{
			questionText: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Poor appetite or overeating?',
			answerOptions: [
				{ answerText: 'Not At All' },
				{ answerText: 'Several Days' },
				{ answerText: 'More Than Half the Days' },
				{ answerText: 'Nearly Every Day' },
			],
		},
		{
			questionText: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling bad about yourself - or that you are a failure or have let yourself or your family down?',
			answerOptions: [
				{ answerText: 'Not At All' },
				{ answerText: 'Several Days' },
				{ answerText: 'More Than Half the Days' },
				{ answerText: 'Nearly Every Day' },
			],
		},
		{
			questionText: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Trouble concentrating on things, such as reading the newspaper or watching television?',
			answerOptions: [
				{ answerText: 'Not At All' },
				{ answerText: 'Several Days' },
				{ answerText: 'More Than Half the Days' },
				{ answerText: 'Nearly Every Day' },
			],
		},
		{
			questionText: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Moving or speaking so slowly that other people could have noticed. Or, the opposite - being so fidgety or restless that you have been moving around a lot more than usual?',
			answerOptions: [
				{ answerText: 'Not At All' },
				{ answerText: 'Several Days' },
				{ answerText: 'More Than Half the Days' },
				{ answerText: 'Nearly Every Day' },
			],
		},
		{
			questionText: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Thoughts that you would be better off dead or of hurting yourself in some way?',
			answerOptions: [
				{ answerText: 'Not At All' },
				{ answerText: 'Several Days' },
				{ answerText: 'More Than Half the Days' },
				{ answerText: 'Nearly Every Day' },
			],
		},
	];
	const handleAnswerOptionClick = (question, answer) => {

		const nextQuestion = currentQuestion + 1;

		if (nextQuestion < questions.length) {
			setResult([...result, { "question": question, "answer": answer }]);
			setCurrentQuestion(nextQuestion);
		} else {
			let user = JSON.parse(sessionStorage.getItem("AUTH_TOKEN"));
			send_self_Assesment(user.email_address, result).then(
				data => setDisplayResult(true),
				error => { setErrorMessage("There was error submitting"); }
			);
		}
	};
	const handleStartQuiz = () => {
		setStartQuiz(false);
	}

	return (
		<div>

			{displayResult ? (
				<div className="startQuiz">
					<p>Good Bye we will examine the results and counsellor will book the appointment shortly</p>
					<button className="NextButton" style={{ display: 'block', textAlign: 'center' }}
						onClick={() => refresh()}>Show Submission</button>

				</div>
			) : (
				<>


					{startQuiz ? (
						<div className="startQuiz">
							<p style={{ display: 'block', textAlign: 'justify' }}>
								By clicking 'Start', you acknowledge that the Arogya is only an educational tool and is not a substitute for a diagnosis, consultation, or visit with your doctor or other healthcare provider.
							</p>
							<button className="NextButton" style={{ display: 'block', textAlign: 'center' }} onClick={() => handleStartQuiz()}>Start Quiz</button>
							<p style={{ display: 'block', textAlign: 'justify' }}> This [course] is not to be used for diagnosis, treatment or referral services. The materials in CAMHs online courses are only educational tools. They are of general value, and may not apply to specific situations. They are not considered professional advice or guidance for a particular case. Online resources are not a substitute for the personalized judgment and care of a trained medical professional</p>
						</div>

					)
						: (
							<div className="startQuiz">
								<div className='question-section'>
									<div className='question-count'>
										<span>Question {currentQuestion + 1}</span>/{questions.length}
									</div>
									<div className='question-text'>{questions[currentQuestion].questionText}</div>
								</div>
								<div className='answer-section'>
									{questions[currentQuestion].answerOptions.map((answerOption) => (
										<button className="NextButton" onClick={() => handleAnswerOptionClick(questions[currentQuestion].questionText, answerOption.answerText)}>{answerOption.answerText}</button>
									))}
								</div>
								<div style={{ color: 'red' }}>
									{errorMessage}
								</div>
							</div>
						)
					}
				</>

			)}

		</div>
	)
}
export default Quiz;