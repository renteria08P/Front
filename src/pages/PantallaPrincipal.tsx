import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../assets/fondo.jpg";
import "../App.css";
import { crearSala, unirseSala } from "../services/rooms";

const PantallaPrincipal: React.FC = () => {
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState("");
  const [nickname, setNickname] = useState("");

  const handleCrearSala = async () => {
    try {
      const sala = await crearSala();
      navigate(`/moderador/${sala.code}`); 
    } catch (error) {
      console.error("Error al crear sala:", error);
    }
  };

  const handleUnirseSala = async () => {
    if (!codigo || !nickname) {
      alert("Debes ingresar tu nombre y el código");
      return;
    }
    try {
      const data = await unirseSala(codigo, nickname);
      navigate(`/jugador/${data.player.id}/${data.room.code}`);
    } catch (error) {
      console.error("Error al unirse a sala:", error);
    }
  };

  return (
    <div className="inicio" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="inicio">
        <div className="contenido">
          <h2 className="subtitulo">Selecciona una opción</h2>

          {/* Botón crear sala */}
          <button className="arcade-btn" onClick={handleCrearSala}>
            Crear Sala
          </button>

          {/* Inputs y botón para unirse */}
          <input
            type="text"
            placeholder="Código de sala"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="arcade-input"
          />
          <input
            type="text"
            placeholder="Tu nombre"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="arcade-input"
          />
        </div>
        <button className="arcade-btn" onClick={() => navigate("/moderador")}>
          Crear Sala
        </button>

        <button className="arcade-btn" onClick={() => navigate("/jugador")}>
          Unirse a Sala
        </button>

        <div className="brick"></div>
      </div>
    </div>
  );
};

export default PantallaPrincipal;
