// AudioPlayer.js
import React, { useState, useEffect } from 'react';

const AudioPlayer = ({ src, isPlaying, userInteracted }) => {
  const [audio] = useState(new Audio(src));
  const [isLooping, setIsLooping] = useState(false);

  useEffect(() => {
    if (userInteracted && isPlaying) {
      audio.loop = true; // Establece el bucle del audio cuando el usuario interactúa con la página
      audio.play();
      setIsLooping(true); // Actualiza el estado para indicar que el audio está en bucle
    } else {
      audio.pause();
      audio.currentTime = 0;
      setIsLooping(false); // Actualiza el estado para indicar que el audio no está en bucle
    }

    return () => {
      audio.pause();
      setIsLooping(false); // Al salir del componente, asegúrate de que el estado refleje que el audio no está en bucle
    };
  }, [isPlaying, userInteracted, audio]);

  return null; // El componente no renderiza nada en la interfaz, ya que es solo para la lógica de audio
};

export default AudioPlayer;
