// AudioPlayer.js
import React, { useState, useEffect } from 'react';

const AudioPlayer = ({ src, isPlaying, userInteracted }) => {
  const [audio] = useState(new Audio(src));

  useEffect(() => {
    if (userInteracted && isPlaying) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0; // Reinicia el tiempo de reproducción al principio
    }
  }, [isPlaying, userInteracted, audio]);

  return null; // El componente no renderiza nada en la interfaz, ya que es solo para la lógica de audio
};

export default AudioPlayer;
