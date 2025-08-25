import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { socket } from "../services/socket";
import { enviarRespuestas } from "../services/answers";
import fondo from "../assets/fondo.jpg";
import "../App.css";

const Pregunta: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomCode, playerId, nickname } = location.state || {};

  const [pregunta, setPregunta] = useState<any | null>(null);
  const [opciones, setOpciones] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    socket.on("new-question", (data) => {
      if (data.roomCode === roomCode) {
        setPregunta(data.question);
        setOpciones(data.question.options || []);
      }
    });

    socket.on("scoreboard-updated", (payload) => {
      const me = payload.scoreboard.find((p: any) => p.playerId === playerId);
      if (me) setScore(me.score);
    });

    return () => {
      socket.off("new-question");
      socket.off("scoreboard-updated");
    };
  }, [roomCode, playerId]);

  const handleResponder = async (opcion: string) => {
    if (!pregunta) return;

    try {
      const { results } = await enviarRespuestas(roomCode, [
        {
          questionId: pregunta.id,
          playerId,
          value: opcion,
          timeMs: 5000,
        },
      ]);

      const me = results.find((r: any) => r.playerId === playerId);
      if (me) setScore(me.totalScore);

      setPregunta(null);
      setOpciones([]);
      navigate("/puntaje", {
        state: { roomCode, playerId, nickname, score: me?.totalScore || score },
      });
    } catch (err) {
      console.error("Error al responder:", err);
    }
  };

  return (
    <div className="inicio" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="pregunta-box">
        <h2 className="subtitulo">Pregunta</h2>
        {pregunta ? (
          <>
            <h3 className="arcade-label">{pregunta.text}</h3>
            {opciones.map((op, i) => (
              <button
                key={i}
                className="arcade-btn mt-2"
                onClick={() => handleResponder(op)}
              >
                {op}
              </button>
            ))}
          </>
        ) : (
          <p className="espera-text">⌛ Esperando nueva pregunta...</p>
        )}
        <p className="codigo-sala">🏆 Puntaje: {score}</p>
      </div>
    </div>
  );
};

export default Pregunta;
