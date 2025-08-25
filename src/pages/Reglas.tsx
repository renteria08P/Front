import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../assets/fondo.jpg";
import "../App.css";
import { crearSala } from "../services/rooms";

const Jugador: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [codigo, setCodigo] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleCrearSala = async () => {
    if (!nickname.trim()) return alert("Ingresa tu nickname");
    try {
      const { room, player } = await crearSala(nickname);
      setCodigo(room.code);
      setPlayerId(player.id);

      navigate("/reglas", {
        state: { roomCode: room.code, playerId: player.id, nickname },
      });
    } catch (err) {
      console.error("Error creando sala:", err);
      alert("No se pudo crear la sala");
    }
  };

  return (
    <div className="inicio" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="jugador-box">
        <h2 className="subtitulo">🙋‍♂️ Crear Sala</h2>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="arcade-input"
          placeholder="Tu nickname..."
        />
        <button className="arcade-btn mt-4" onClick={handleCrearSala}>
          Crear Sala
        </button>
        {codigo && (
          <p className="codigo-sala">
            ✅ Código de sala: <b>{codigo}</b>
          </p>
        )}
      </div>
    </div>
  );
};

export default Jugador;
