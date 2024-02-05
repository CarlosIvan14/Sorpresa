import React, { useState } from 'react';
import './RiddleGame.css';
import flower1 from './flowers/flower1.png'; // Importa las imágenes de flores
import flower2 from './flowers/flower2.png';
import flower3 from './flowers/flower3.png';
import flower4 from './flowers/flower4.png';
import flower5 from './flowers/flower5.png';

const RiddleGame = ({ onCompletion, onNextGame }) => {
  const [questions, setQuestions] = useState([
    { id: 1, text: 'Fecha en que nos conocimos por primera vez (pon la respuesta con número en mes y día: 00/00/0000)', answer: '10/10/2021' },
    { id: 2, text: 'Gesto que me encanta de ti y que siempre te digo que son los mejores (Pista empieza con A, termina con s y tienes 7 letras)', answer: 'Abrazos' },
    { id: 3, text: 'Te dedique una carte en la que te exprese porque me encantan tus ... (Pista 4 letras)', answer: 'Ojos' },
    { id: 4, text: 'Nombre del lugar en el que nos conocimos (Pista tiene 9 letras, escribe la primera en mayúscula y las demas en minúscula)', answer: 'Balneario'},
    { id: 5, text: 'Fecha en la que tuve el honor de ser tu novio (pon la respuesta con número en mes y día: 00/00/0000)', answer: '14/02/2022'},
    // Agrega más preguntas según sea necesario
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));
  const [showResults, setShowResults] = useState(Array(questions.length).fill(false));

  const handleInputChange = (e, index) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = e.target.value;
    setUserAnswers(newAnswers);
  };

  const handleCheckAnswer = (index) => {
    const currentQuestion = questions[index];
    if (userAnswers[index].trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
      setShowResults((prevResults) => {
        const newResults = [...prevResults];
        newResults[index] = true;
        return newResults;
      });
    }
  };

  const handleNextGame = () => {
    onCompletion();
    onNextGame();
  };

  return (
    <div>
      <p>Pasamos a las adivinansas, aqui es donde tienes que recordar nuestra historia para continuar</p>
      <div className="riddle-container">
        {questions.map((question, index) => (
          <div key={question.id} className={`riddle-card ${showResults[index] ? 'correct' : ''}`}>
            <img
                className="flower"
                src={index === 0 ? flower1 : index === 1 ? flower2 : index === 2 ? flower3 : index === 3 ? flower4 : flower5}
                alt={`Flower ${index + 1}`}
                style={{ display: showResults[index] ? 'block' : 'none' }}
            />
            <p className={`riddle-text ${showResults[index] ? 'fade-out' : ''}`}>{question.text}</p>
            <input
              type="text"
              value={userAnswers[index]}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Escribe tu respuesta"
              disabled={showResults[index]}
              style={{ display: showResults[index] ? 'none' : 'block' }}
              className='in'
            />
            <button
              className='button1'
              onClick={() => handleCheckAnswer(index)}
              disabled={showResults[index]}
              style={{ display: showResults[index] ? 'none' : 'block' }}
            >
              Comprobar respuesta
            </button>
          </div>
        ))}
      </div>
      {showResults.every((result) => result) && (
        <div className="completion-message">
          <p>Muy bien recordaste parte de nuestra historia, estamos cada vez mas cerca de la sorpresa final</p>
          <button onClick={handleNextGame}>Continuar</button>
        </div>
      )}
    </div>
  );
};

export default RiddleGame;
