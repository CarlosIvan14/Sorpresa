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
            <p className='mensaje'>Querida Lupita❤️</p>
            <p className='mensaje'> 
            Me dijiste que te escribiera algo memorable, así que aquí esta,  recuerdo la primera vez que te vi, o como te gusta llamarlo "nuestro bello click" fue un 10 de octubre de 2021, no se si te lo he dicho pero para mi hasta día de hoy me parece casi mágico el como te conocí no tal vez por el lugar ya que como bien sabes fue en el balneario el día de la fiesta del cumpleaños de Max, estabas ahí en la alberca yo llegué y la verdad es que no hablaba mucho con nadie de ahí, y cuando te vi fue como si viera el sol por primera vez eres la niña más guapa y con ojos más hermosos que he conocido, recuerdo que ambos íbamos de negro ese día, el equipo de playera negra jaja, y que buen equipo hicimos que ganamos en todos o casi todos los juegos, fue un día que recuerdo con mucha ilusión y amor porque fue el día donde por primera vez tuve una platica contigo, de ahí claro que fueron progresando las cosas, pero ese día cuando estábamos afuera de los vestidores del balneario platicando supe que de verdad serias alguien muy importante en mi vida porque recuerdo como te reías y no sabes las ganas que me dieron de seguir contando chistes con tal de verte sonreír, fue el día que me enamoré de ti, y si a día de hoy se que ha pasado muchísimo tiempo desde aquella ocasión y no te lo he dicho, pero gracias a ti es que hoy en día si me preguntan por amor a primera vista digo que si existe, porque como no voy a creer que existe si tu me hiciste experimentarlo, recuerdo nuestra primera cita, abrazo, beso, pelea, y más cosas juntos, la verdad es que como te dije algún día creo que tu eres y serás la persona a la que más ame en este mundo porque el haberte conocido ese día fue mágico en cierta forma porque yo ese día te juro por mi vida que no iba a ir, no tenía ganas la verdad de ir, y por lo que recuerdo que me contaste ese mismo día tu estabas igual  y llámame loco pero a mi me parece o una gran coincidencia o simplemente magia el que ambos estuviéramos ahí justo ese día y pudiéramos empezar nuestra historia juntos, se queda pasado mucho en los últimos meses y que has pasado tu también por mucho más, y de verdad no sabes cuanto lo siento y cuanto quiero que tu estés bien y feliz, no se que valla a pasar con nosotros dos en un futuro, pero lo que si se es que te amo igual que el primer día, y como no hacerlo si hasta en mía sueños apareces, la verdad es que se que es complicada nuestra situación y no se como pero se que estaremos bien juntos porque una conexión así de mágica no sucede otra vez en la vida, quiero que sepas que siempre que tu quieras y siempre que lo necesites yo estaré para ti, independientemente de cualquier cosa y no se tu, pero yo sigo creyendo en que algún día si tenemos algo de suerte podremos estar juntos de nuevo, de verdad contigo he imaginado toda mi vida y la verdad espero algún día poder compartir ese sueño contigo y hacerlo realidad dándote todo lo que te mereces.
            </p>
            <p>Feliz San Valentin, Te amo ❤️</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carta;
