import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../assets/fondo.jpg";
import "../App.css";

const CrearSala: React.FC = () => {
  const navigate = useNavigate();
  const [codigoSala, setCodigoSala] = useState("");
  const [jugadores, setJugadores] = useState(0);
  const [estado] = useState("Esperando jugadores");

  // Codigo de sala
  useEffect(() => {
    const fetchCodigo = async () => {
      try {
        const res = await fetch("http://localhost:3333/rooms");
        const data = await res.json();
        setCodigoSala(data.codigo);
      } catch (error) {
        console.error("Error al obtener el código:", error);
      }
    };
    fetchCodigo();
  }, []);

  // Contador
  useEffect(() => {
    const intervalo = setInterval(() => {
      setJugadores((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  const handleCerrar = () => {
    if (window.confirm("¿Seguro que quieres cerrar la sala?")) {
      if (window.close) {
        window.close();
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="inicio" style={{ backgroundImage: `url(${fondo})` }}>
      {/* Icono de cerrar */}
      <button className="btn-cerrar" onClick={handleCerrar}>
        ✖
      </button>

      <div className="contenido">
        <div className="card moderador">
          <h2 className="titulo">Crear Nueva Sala</h2>

          {/* Código de la sala */}
          <div className="sala-codigo">
            <p>Código de tu sala:</p>
            <h1 className="codigo">{codigoSala || "Cargando..."}</h1>
            <p>Los jugadores usarán este código para unirse</p>
          </div>

          {/* Jugadores conectados */}
          <div className="jugadores">
            <p>Jugadores conectados:</p>
            <span className="jugadores-count">{jugadores}</span>
          </div>

          {/* Estado de la sala */}
          <div className="estado">
            <p>Estado de la sala:</p>
            <span className="estado-label">{estado}</span>
          </div>

          {/* Botón de inicio */}
          <button
            className="arcade-btn btn-iniciar"
            onClick={() => navigate("/CrearPregunta")}
          >
            Iniciar Juego
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrearSala;
