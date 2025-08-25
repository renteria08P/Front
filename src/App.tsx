import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Páginas
import Inicio from "./pages/Inicio";
import PantallaPrincipal from "./pages/PantallaPrincipal";

// Flujo Jugador
import Jugador from "./pages/Jugador";
import Reglas from "./pages/Reglas";
import Pregunta from "./pages/Pregunta";
import Puntaje from "./pages/Puntaje";

// Flujo Moderador
import Moderador from "./pages/Moderador";
import Marcador from "./pages/Marcador";

function App() {
  return (
    <Router>
      <Routes>
        {/* Pantalla inicial */}
        <Route path="/" element={<Inicio />} />

        {/* Menú principal */}
        <Route path="/pantalla-principal" element={<PantallaPrincipal />} />

        {/* === FLUJO JUGADOR === */}
        <Route path="/jugador" element={<Jugador />} />
        <Route path="/reglas" element={<Reglas />} />
        <Route path="/pregunta" element={<Pregunta />} />
        <Route path="/puntaje" element={<Puntaje />} />

        {/* === FLUJO MODERADOR === */}
        <Route path="/moderador" element={<Moderador />} />
        <Route path="/marcador" element={<Marcador />} />
      </Routes>
    </Router>
  );
}

export default App;
