import React from "react";
import fondo from "../assets/fondo.jpg";
import "../App.css";
import { useNavigate } from "react-router-dom";

const CrearSala: React.FC = () => {
   const navigate = useNavigate();
  

  return (
    <div className="inicio" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="contenido">
    
          {/* Card Moderador */}
          <div className="card moderador">
            <h2>Crear Nueva Sala</h2>
            <p>
              Crea salas, lanza preguntas con tiempo límite y controla el juego
            </p>
            <h2>Código de tu Sala:</h2>
            <h3> " " </h3>
            <h2>Los jugadores usarán este código para unirse</h2>
            <h2>Jugadores Conectados:</h2>
            <h3> " "</h3>
            <input></input>
            <h2>Estado de la Sala</h2>
            <h3>" "</h3>
            <button className="arcade-btn" onClick={() => navigate("/CrearPregunta")}>
            Iniciar Juego
          </button>
        </div>
        </div>
        </div>
  );
};

export default CrearSala;
