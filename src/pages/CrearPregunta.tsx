import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../assets/fondo.jpg";
import "../App.css";

const CrearPregunta: React.FC = () => {
  const [pregunta, setPregunta] = useState("");
  const [opciones, setOpciones] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    const nuevasOpciones = [...opciones];
    nuevasOpciones[index] = value;
    setOpciones(nuevasOpciones);
  };

  const handleEnviarPregunta = () => {
    if (!pregunta.trim() || opciones.some((op) => !op.trim())) {
      alert("⚠️ Debes completar la pregunta y todas las opciones.");
      return;
    }
    // Aquí envías la pregunta al backend con fetch/axios/socket
    console.log("Pregunta enviada:", pregunta, opciones);
    setPregunta("");
    setOpciones(["", "", "", ""]);
  };

  // 👇 este roomCode vendría de props o estado global
  const roomCode = "0123466";

  return (
    <div
      className="inicio"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="moderador-card">
        {/* 🔹 Encabezado */}
        <div className="moderador-header">
          <span className="titulo">📋 Crear Pregunta</span>
          <span className="codigo-sala">Sala: ABCDEF | Código: {roomCode}</span>
          <div className="header-derecha">
            <span>👥 Jugadores: 0</span>
            <span
              style={{
                cursor: "pointer",
                color: "blue",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/marcador", { state: { roomCode } })}
            >
              🏆 Marcador
            </span>
          </div>
        </div>

        {/* 🔹 Formulario */}
        <div className="moderador-body">
          <label className="label">Pregunta</label>
          <input
            type="text"
            className="input"
            placeholder="Escribe la pregunta..."
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
          />

          <label className="label">Opciones de Respuesta</label>
          {opciones.map((op, index) => (
            <input
              key={index}
              type="text"
              className="input"
              placeholder={`Opción ${index + 1}...`}
              value={op}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ))}

          <button className="btn" onClick={handleEnviarPregunta}>
            🚀 Hacer Pregunta
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrearPregunta;
