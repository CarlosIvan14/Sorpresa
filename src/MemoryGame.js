// MemoryGame.js
import React, { useState, useEffect } from 'react';
import './MemoryGame.css';
const phrases = [
  'Muchas gracias por ser parte de mi vida',
  'Tus abrazos son los mejores',
  'Ver tus ojos es mi momento favorito',
  'Estando contigo nada es imposible',
  'Tu llenas mis dias de felicidad',
  'Si tengo un deseo es algun dia poder estar de nuevo contigo',
  'Espero de verdad ser parte de tu vida por mucho mas tiempo',
  'Eres mi sueño hecho realidad',
  'La vida es más hermosa contigo',
  'Eres mi motivación para ser mejor'
];

const MemoryGame = ({ onCompletion }) => {
  const [cards, setCards] = useState([]);
  const [flippedCount, setFlippedCount] = useState(0);

  useEffect(() => {
    const initialCards = phrases
      .concat(phrases) // Duplicar para tener parejas
      .sort(() => Math.random() - 0.5) // Barajar las cartas
      .map((phrase, index) => ({
        id: index + 1,
        content: phrase,
        flipped: false,
        matched: false
      }));

    setCards(initialCards);
  }, []);

  useEffect(() => {
    if (flippedCount === 2) {
      const flippedCards = cards.filter((card) => card.flipped && !card.matched);
      if (flippedCards.length === 2) {
        checkMatch(flippedCards);
      }
      setFlippedCount(0);
    }
  }, [cards, flippedCount]);

  const checkMatch = (flippedCards) => {
    if (flippedCards[0].content === flippedCards[1].content) {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === flippedCards[0].id || card.id === flippedCards[1].id
            ? { ...card, matched: true }
            : card
        )
      );
    } else {
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.flipped && !card.matched ? { ...card, flipped: false } : card
          )
        );
      }, 1000);
    }
  };
  const handleCardClick = (id) => {
    setFlippedCount((prevCount) => prevCount + 1);
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, flipped: true } : card
      )
    );
  };
  return (
    <div>
      <p>Para empezar con este regalo, vamos a jugar memorama, lo que tienes que haces es sencillo da click en una carta y luego en otra, si coinciden se pondran de un color diferente, si no lo hacen espera a que vuelvan a voltarse para intentarlo de nuevo,tienes intentos infinitos para hacerlas coincidir, tu puedes.</p>
      <div className="memory-game">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.flipped ? 'flipped' : ''} ${
              card.matched ? 'matched' : ''
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.flipped || card.matched ? card.content : '❤️'}
          </div>
        ))}
      </div>
      {cards.every((card) => card.matched) && (
        <div>
          <p>Felicidades, has logrado completar el primer paso de este regalo, continua adelante para mas sorpresas.</p>
          <button onClick={onCompletion}>Continuar</button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
