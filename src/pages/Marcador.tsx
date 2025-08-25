import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../services/socket";
import { obtenerScore } from "../services/score";
import fondo from "../assets/fondo.jpg";
import "../App.css";

interface Player {
  playerId: number;
  nickname: string;
  score: number;
}

const Marcador: React.FC = () => {
  const location = useLocation();
  const { roomCode } = location.state || {};
  const [jugadores, setJugadores] = useState<Player[]>([]);

  const cargarMarcador = async () => {
    try {
      const data = await obtenerScore(roomCode);
      setJugadores(data);
    } catch (err) {
      console.error("Error cargando marcador:", err);
    }
  };

  useEffect(() => {
    if (!roomCode) return;

    cargarMarcador();

    socket.on("scoreboard-updated", (payload) => {
      if (payload.roomCode === roomCode) {
        setJugadores(payload.scoreboard);
      }
    });

    return () => {
      socket.off("scoreboard-updated");
    };
  }, [roomCode]);

  return (
    <div className="inicio" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="marcador-box">
        <h2 className="subtitulo">🏆 Marcador</h2>
        {jugadores.length === 0 ? (
          <p className="arcade-label">Aún no hay jugadores</p>
        ) : (
          <table className="arcade-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Jugador</th>
                <th>Puntos</th>
              </tr>
            </thead>
            <tbody>
              {jugadores.map((j, i) => (
                <tr key={j.playerId}>
                  <td>{i + 1}</td>
                  <td>{j.nickname}</td>
                  <td>{j.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Marcador;
