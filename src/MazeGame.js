// MazeGame.js
import React, { useState } from 'react';
import './MazeGame.css';

const MazeGame = ({ onCompletion }) => {
  const [playerPosition, setPlayerPosition] = useState({ row: 0, col: 0 });
  const [startingPosition, setStartingPosition] = useState(null);

  const S = 'I';
  const E = 'F';

  const maze = [
    // Define aquí tu laberinto 10x10
    // 0: camino libre, 1: pared, 'S': inicio, 'E': final
    [S, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, E, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        movePlayer(-1, 0);
        break;
      case 'ArrowDown':
        movePlayer(1, 0);
        break;
      case 'ArrowLeft':
        movePlayer(0, -1);
        break;
      case 'ArrowRight':
        movePlayer(0, 1);
        break;
      default:
        break;
    }
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setStartingPosition({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    e.preventDefault();

    const touch = e.touches[0];
    const deltaX = touch.clientX - startingPosition.x;
    const deltaY = touch.clientY - startingPosition.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      movePlayer(0, deltaX > 0 ? 1 : -1);
    } else {
      movePlayer(deltaY > 0 ? 1 : -1, 0);
    }
  };

  const handleTouchEnd = () => {
    setStartingPosition(null);
  };

  const movePlayer = (rowOffset, colOffset) => {
    const newRow = playerPosition.row + rowOffset;
    const newCol = playerPosition.col + colOffset;

    if (
      newRow >= 0 &&
      newRow < maze.length &&
      newCol >= 0 &&
      newCol < maze[0].length &&
      maze[newRow][newCol] !== 1
    ) {
      setPlayerPosition({ row: newRow, col: newCol });

      if (maze[newRow][newCol] === 'F') {
        onCompletion();
      }
    }
  };

  const handleNextGameClick = () => {
    onCompletion(); // Esta función debe desencadenar el avance al siguiente juego
  };

  return (
    <div className='cont'>
      <p>Muy bien llegaste al último de los juegos, el laberinto. Tienes que ir desde la I de inicio hasta la F de final. Al completar este juego desbloquearás una última sorpresa. ¡Tú puedes!</p>
      <div
        className="maze-container"
        tabIndex="0"
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {maze.map((row, rowIndex) => (
          <div key={rowIndex} className="maze-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${cell === 1 ? 'wall' : ''} ${
                  rowIndex === playerPosition.row && colIndex === playerPosition.col ? 'player' : ''
                }`}
              >
                {cell === 'I' && 'I'}
                {cell === 'F' && 'F'}
              </div>
            ))}
          </div>
        ))}
      </div>
      {maze[playerPosition.row][playerPosition.col] === 'F' && (
        <button className="unlock-button" onClick={handleNextGameClick}>
          Desbloquear sorpresa
        </button>
      )}
    </div>
  );
};


export default MazeGame;
