import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function ViajeEnCurso() {
  const navigate = useNavigate();
  const [tiempoRestante, setTiempoRestante] = useState(60); // 60 segundos para cancelar

  // Temporizador ⏳
  useEffect(() => {
    if (tiempoRestante > 0) {
      const timer = setTimeout(() => setTiempoRestante(tiempoRestante - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [tiempoRestante]);

  const cancelarViaje = () => {
    alert("El viaje ha sido cancelado ❌");
    navigate("/buscar-viajes");
  };

  return (
    <div className="viaje-curso-container">
      <div className="viaje-curso-card">
        <h2>🚗 Tu Conductor Está en Camino</h2>

        {/* Información del conductor */}
        <div className="conductor-info">
          <img
            src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
            alt="Foto del conductor"
            className="foto-conductor"
          />
          <div className="datos-conductor">
            <p><strong>Nombre:</strong> Carlos Méndez</p>
            <p><strong>Vehículo:</strong> Toyota Corolla 2021</p>
            <p><strong>Placa:</strong> ABC-123</p>
            <p><strong>Color:</strong> Gris Plata</p>
            <p><strong>Calificación:</strong> ⭐ 4.8</p>
          </div>
        </div>

        {/* Mapa simulado */}
        <div className="mapa-simulacion">
          <div className="ruta-linea"></div>
          <div className="auto-icono">🚘</div>
        </div>

        {/* Temporizador */}
        <div className="temporizador">
          ⏳ Tiempo para cancelar: <span>{tiempoRestante}s</span>
        </div>

        <button
          className="btn-cancelar"
          onClick={cancelarViaje}
          disabled={tiempoRestante <= 0}
        >
          Cancelar viaje
        </button>
      </div>
    </div>
  );
}

export default ViajeEnCurso;
