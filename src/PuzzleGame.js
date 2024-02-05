import React, { useState, useEffect } from 'react';
import './PuzzleGame.css';
import puzzleImage from './puzzle_image.jpeg';

const PuzzleGame = ({ onCompletion, onNextGame }) => {
  const [completed, setCompleted] = useState(false);
  const [pieces, setPieces] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);

  useEffect(() => {
    initializePuzzle();
  }, []);

  useEffect(() => {
    checkCompletion();
  }, [pieces]);

  const initializePuzzle = () => {
    const image = new Image();
    image.src = puzzleImage;

    image.onload = () => {
      const pieceSize = image.width / 3;
      const initialPieces = [];

      const orderedPositions = Array.from({ length: 9 }, (_, index) => index + 1);
      const shuffledPositions = shuffleArray(orderedPositions.slice(0, 9));

      for (let i = 0; i < 9; i++) {
        const pieceNumber = shuffledPositions[i];
        const canvas = document.createElement('canvas');
        canvas.width = pieceSize;
        canvas.height = pieceSize;

        const context = canvas.getContext('2d');
        context.drawImage(
          image,
          ((pieceNumber - 1) % 3) * pieceSize,
          Math.floor((pieceNumber - 1) / 3) * pieceSize,
          pieceSize,
          pieceSize,
          0,
          0,
          pieceSize,
          pieceSize
        );

        const imageData = context.getImageData(0, 0, pieceSize, pieceSize);
        const pieceDataUrl = canvas.toDataURL('image/png');

        initialPieces.push({
          id: pieceNumber,
          position: { row: Math.floor(i / 3), col: i % 3 },
          image: pieceDataUrl,
        });
      }

      setPieces(initialPieces);
    };
  };

  const handlePieceClick = (clickedPiece) => {
    if (selectedPiece) {
      swapPieces(selectedPiece, clickedPiece);
      setSelectedPiece(null);
    } else {
      setSelectedPiece(clickedPiece);
    }
  };

  const swapPieces = (pieceA, pieceB) => {
    setPieces((prevPieces) => {
      const updatedPieces = prevPieces.map((piece) => {
        if (piece.id === pieceA.id) {
          return { ...piece, position: pieceB.position };
        } else if (piece.id === pieceB.id) {
          return { ...piece, position: pieceA.position };
        }
        return piece;
      });

      return updatedPieces;
    });
  };

  const checkCompletion = () => {
    const correctOrder = Array.from({ length: 9 }, (_, index) => index + 1);
    const currentOrder = pieces
      .sort((a, b) => a.id - b.id)
      .map((piece) => piece.position.row * 3 + piece.position.col + 1);

    const allPiecesInOrder = JSON.stringify(correctOrder) === JSON.stringify(currentOrder);

    if (allPiecesInOrder) {
      setCompleted(true);
      onCompletion();
    } else {
      setCompleted(false);
    }
  };

  const shuffleArray = (array) => {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  const handleNextGame = () => {
    setCompleted(false);
    setSelectedPiece(null);
    onNextGame(); // Llama a la función proporcionada por App.js para pasar al siguiente juego
    initializePuzzle();
  };

  return (
    <div>
      <p>Llegamos al segundo juego, para continuar tienes que completar la imagen y ordenar las piezas del rompecabezas.</p>
      <div className="puzzle">
        {pieces.map((piece) => (
          <div
            key={piece.id}
            className={`piece ${completed ? 'completed' : ''} ${selectedPiece === piece ? 'selected' : ''}`}
            style={{
              gridRow: piece.position.row + 1,
              gridColumn: piece.position.col + 1,
              backgroundImage: `url(${piece.image})`,
            }}
            onClick={() => handlePieceClick(piece)}
          ></div>
        ))}
      </div>
      {completed && (
        <div>
          <p className="completed-message">Felicidades completaste el rompecabezas, ahora sigamos con los juegos.</p>
          <button onClick={handleNextGame}>Continuar</button>
        </div>
      )}
    </div>
  );
};

export default PuzzleGame;
