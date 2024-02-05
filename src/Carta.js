// Carta.js
import React, { useState } from 'react';
import './Carta.css';

const Carta = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleHeartClick = () => {
    setIsOpen(true);
  };

  return (
    <div className={`carta-container ${isOpen ? 'open' : ''}`} onClick={handleHeartClick}>
      <div className="sobre">
        <div className={`heart ${isOpen ? 'fade-out' : ''}`}>❤️</div>
      </div>
      <div className={`contenido ${isOpen ? 'fade-in' : ''}`}>
        {isOpen && (
          <div className="mensaje">
            <p className='mensaje'>¡Sorpresa!</p>
            <p className='mensaje'>¡Has desbloqueado algo especial!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carta;
