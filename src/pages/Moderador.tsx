import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import fondo from "../assets/fondo.jpg";
import "../App.css";
import { crearPregunta } from "../services/questions";

const Moderador: React.FC = () => {
  const [pregunta, setPregunta] = useState("");
  const [opciones, setOpciones] = useState(["", "", "", ""]);
  const navigate = useNavigate();
  const location = useLocation();

  // ⬅️ El código de la sala viene de la navegación (Jugador -> Reglas -> Moderador)
  const roomCode = location.state?.roomCode || "";

  const handleChange = (index: number, value: string) => {
    const newOpciones = [...opciones];
    newOpciones[index] = value;
    setOpciones(newOpciones);
  };

  const handleHacerPregunta = async () => {
    if (!roomCode || !pregunta.trim()) return alert("Llena los campos");

    try {
      await crearPregunta(roomCode, pregunta, opciones);
      setPregunta("");
      setOpciones(["", "", "", ""]);
    } catch (err) {
      console.error("Error creando pregunta:", err);
      alert("No se pudo enviar la pregunta");
    }
  };

  return (
    <div className="inicio" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="moderador-box">
        <h2 className="subtitulo">🎮 Moderador</h2>

        <p className="codigo-sala">Sala actual: {roomCode || "Ninguna"}</p>

        <div className="pregunta-box">
          <label className="arcade-label">Pregunta</label>
          <input
            type="text"
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            className="arcade-input"
            placeholder="Escribe la pregunta..."
          />

          <label className="arcade-label">Opciones</label>
          {opciones.map((op, index) => (
            <input
              key={index}
              type="text"
              value={op}
              onChange={(e) => handleChange(index, e.target.value)}
              className="arcade-input"
              placeholder={`Opción ${index + 1}...`}
            />
          ))}

          <button className="arcade-btn mt-4" onClick={handleHacerPregunta}>
            🚀 Hacer Pregunta
          </button>
        </div>

        <button
          className="arcade-mini-btn mt-4"
          onClick={() => navigate("/marcador", { state: { roomCode } })}
          disabled={!roomCode}
        >
          🏆 Ver Marcador
        </button>
      </div>
    </div>
  );
};

export default Moderador;
