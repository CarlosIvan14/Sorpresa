// App.js
import React, { useState, useEffect } from 'react';
import MemoryGame from './MemoryGame';
import PuzzleGame from './PuzzleGame';
import RiddleGame from './RiddleGame';
import ProgressBar from './ProgressBar';
import AudioPlayer from './AudioPlayer';
import './ProgressBar.css';
import './App.css';
import backgroundMusic from './mai.mp3';
import MazeGame from './MazeGame';
import Carta from './Carta';


const App = () => {
  const [currentGame, setCurrentGame] = useState(1);
  const [progress, setProgress] = useState(0);

  // Se elimina el estado 'allGamesCompleted'
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    // Lógica para verificar si todos los juegos están completos
    if (progress === 100) {
      // No es necesario establecer 'allGamesCompleted' aquí
    }
  }, [progress]);

  const playBackgroundMusic = () => {
    const audio = new Audio(backgroundMusic);
    audio.loop = true;
    return audio;
  };

  const handleMemoryGameCompletion = () => {
    setProgress(25);
    setCurrentGame(2);
  };

  const handlePuzzleGameCompletion = () => {
    setProgress(50);
  };

  const handleRiddleGameCompletion = () => {
    // Lógica para el juego de adivinanzas
    setProgress(75);
  };

  const handleMazeGameCompletion = () => {
    setProgress(100);
    handleNextGame();
  };

  const handleNextGame = () => {
    setCurrentGame((prevGame) => prevGame + 1);
  };

  const handleClick = () => {
    setUserInteracted(true);
  };

  useEffect(() => {
    const audio = playBackgroundMusic();
    document.addEventListener('click', handleClick);

    return () => {
      audio.pause();
    };
  }, []);

  return (
    <div className="container">
      <h1>Con Amor para ti ❤️</h1>
      <div className="progressBarContainer">
        <ProgressBar progress={progress} />
      </div>
      <div className="cardContainer">
        {currentGame === 1 && (
          <MemoryGame onCompletion={handleMemoryGameCompletion} />
        )}
        {currentGame === 2 && (
          <PuzzleGame onCompletion={handlePuzzleGameCompletion} onNextGame={handleNextGame} />
        )}
        {currentGame === 3 && (
          <RiddleGame onCompletion={handleRiddleGameCompletion} onNextGame={handleNextGame} />
        )}
        {currentGame === 4 && (
          <MazeGame onCompletion={handleMazeGameCompletion} />
        )}
        {currentGame === 5 && (
          <Carta />
        )}
      </div>
      <AudioPlayer src={backgroundMusic} isPlaying={true} userInteracted={userInteracted} />
    </div>
  );
};

export default App;
