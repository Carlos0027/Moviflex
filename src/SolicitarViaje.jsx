import React from "react";
import "./App.css";

export default function SolicitarViaje() {
  const conductor = {
    nombre: "Carlos Méndez",
    telefono: "+57 312 456 7890",
    vehiculo: "Toyota Corolla 2021",
    placa: "ABC-123",
    color: "Gris Plata",
    rating: 4.8,
  };

  return (
    <div className="solicitar-container">
      <h2>Detalles del Conductor</h2>
      <div className="conductor-card">
        <p><strong>Nombre:</strong> {conductor.nombre}</p>
        <p><strong>Teléfono:</strong> {conductor.telefono}</p>
        <p><strong>Vehículo:</strong> {conductor.vehiculo}</p>
        <p><strong>Placa:</strong> {conductor.placa}</p>
        <p><strong>Color:</strong> {conductor.color}</p>
        <p><strong>Calificación:</strong> ⭐ {conductor.rating}</p>
      </div>

      <button
        className="btn-login-moviflex"
        onClick={() => alert("Viaje solicitado exitosamente 🚗💨")}
      >
        Confirmar Viaje
      </button>
    </div>
  );
}
