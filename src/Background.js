import React from 'react';
import './Background.css';

const Background = () => {
  return (
    <div className="background">
      <div className="flowers">
        <div className="flower flower--1"></div>
        <div className="flower flower--2"></div>
        <div className="flower flower--3"></div>
        {/* Puedes agregar más flores según sea necesario */}
      </div>
    </div>
  );
};

export default Background;
