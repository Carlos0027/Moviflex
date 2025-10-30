import React from "react";
import "./App.css";

export default function BuscarViajes() {
  const viajes = [
    { id: 1, destino: "Centro", conductor: "Luis García", placa: "XYZ-987", precio: "$8.000" },
    { id: 2, destino: "Universidad", conductor: "María Torres", placa: "ABC-123", precio: "$6.500" },
    { id: 3, destino: "Terminal", conductor: "Pedro López", placa: "KLM-456", precio: "$10.000" },
  ];

  return (
    <div className="buscar-viajes-container">
      <h2>Viajes Disponibles</h2>
      <p>Selecciona un viaje para ver más detalles o solicitarlo.</p>
      <div className="viajes-lista">
        {viajes.map((v) => (
          <div className="viaje-card" key={v.id}>
            <h3>Destino: {v.destino}</h3>
            <p><strong>Conductor:</strong> {v.conductor}</p>
            <p><strong>Placa:</strong> {v.placa}</p>
            <p><strong>Precio:</strong> {v.precio}</p>
            <button
              className="btn-login-moviflex"
              onClick={() => window.location.href = "/solicitar-viaje"}
            >
              Ver viaje
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
