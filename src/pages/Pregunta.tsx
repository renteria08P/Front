import React, { useState } from "react";
import fondo from "../assets/fondo.jpg";
import "../App.css";

const Pregunta: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25);

  return (
    <div className="inicio" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="pregunta-card">
        {/* Encabezado con número de pregunta y tiempo */}
        <div className="pregunta-header">
          <span className="pregunta-numero">Pregunta 1 de 10</span>
          <span className="pregunta-tiempo">⏰ 00:{timeLeft}</span>
        </div>

        {/* Texto de la pregunta */}
        <h2 className="pregunta-texto">
          ¿Aquí irá el enunciado de la pregunta?
        </h2>

        {/* Opciones */}
        <div className="opciones-grid">
          <button className="opcion-btn">A) Opción 1</button>
          <button className="opcion-btn">B) Opción 2</button>
          <button className="opcion-btn">C) Opción 3</button>
          <button className="opcion-btn">D) Opción 4</button>
        </div>

        {/* Nota */}
        <p className="nota-texto">
          Selecciona tu respuesta antes de que se acabe el tiempo
        </p>
      </div>
    </div>
  );
};

export default Pregunta;
