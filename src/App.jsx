import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeMoviflex from "./HomeMoviflex";
import Login from "./Login";
import Register from "./Register";
import Servicios from "./Servicios";
import BuscarViajes from "./BuscarViajes";
import Nosotros from "./Nosotros";
import SolicitarViaje from "./SolicitarViaje";
import Corporativo from "./Corporativo";
import Entregas from "./Entregas";
import Sostenible from "./Sostenible";
import ViajeEnCurso from "./ViajeEnCurso";
import Pasajero from "./Pasajero";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomeMoviflex />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/buscar-viajes" element={<BuscarViajes />} />
          <Route path="/solicitar-viaje" element={<SolicitarViaje />} />
          <Route path="/corporativo" element={<Corporativo />} />
          <Route path="/entregas" element={<Entregas />} />
          <Route path="/sostenible" element={<Sostenible />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/viaje-en-curso" element={<ViajeEnCurso />} />
          <Route path="/pasajero" element={<Pasajero />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
