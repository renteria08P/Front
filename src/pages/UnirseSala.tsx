import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../assets/fondo.jpg";
import "../App.css";
import Pregunta from "./Pregunta";

const UnirseSala : React.FC = () => {
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState("");
  const [nickname, setNickname] = useState("");

  const handleJoin = () => {
    if (codigo.length === 4 && nickname.trim() !== "") {
      navigate("/CrearSala", { state: { codigo, nickname } });
    } else {
      alert(
        "Por favor, ingresa un código de 4 caracteres y un nickname válido."
      );
    }
  };

  return (
    <div className="inicio" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="contenido">
        <h1 className="titulo">Unirse a Sala</h1>

        {/* Código de Sala */}
        <div className="campo">
          <h2>Código de Sala:</h2>
          <input
            type="text"
            placeholder="Ej: AB12"
            maxLength={4}
            value={codigo}
            onChange={(e) => setCodigo(e.target.value.toUpperCase())}
          />
          <p>
            Ingresa el código de 4 caracteres proporcionado por el moderador
          </p>
        </div>

        {/* Nickname */}
        <div className="campo">
          <h2>Tu Nickname:</h2>
          <input
            type="text"
            placeholder="Ej: SuperPlayer123"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <p>Debe ser único en la sala</p>
        </div>

        {/* Botón */}
        <button className="arcade-btn" onClick= {() => navigate("/Pregunta")}>
           Unirse a la Sala
        </button>

        {/* Brick inferior */}
        <div className="brick"></div>
      </div>
    </div>
  );
};

export default UnirseSala;
