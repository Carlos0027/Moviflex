import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function Corporativo() {
  const navigate = useNavigate();

  const solicitarInfo = () => {
    // aquí podrías abrir un modal o dirigir a un formulario más completo
    alert("Gracias — un asesor corporativo te contactará pronto.");
    navigate("/servicios");
  };

  return (
    <main className="servicios-container">
      <header className="servicios-header">
        <h1>🏢 MoviFlex Corporativo</h1>
        <p>Soluciones de movilidad para empresas: control de gastos, viajes para empleados y reportes detallados.</p>
      </header>

      <section className="soporte" style={{ maxWidth: 900, margin: "30px auto" }}>
        <h3>Servicios para Empresas</h3>
        <ul style={{ textAlign: "left", marginLeft: 24 }}>
          <li>Planes por volumen y facturación mensual</li>
          <li>Asignación de conductores preferentes</li>
          <li>Panel administrativo con reportes y exportes</li>
          <li>Integración con sistemas de recursos humanos</li>
        </ul>

        <h3 style={{ marginTop: 20 }}>Beneficios</h3>
        <p>
          Control de gastos, soporte dedicado 24/7, rutas optimizadas y seguridad en cada viaje.
          Podemos crear planes personalizados según el tamaño de tu empresa.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20 }}>
          <button className="btn-login-moviflex" onClick={solicitarInfo}>
            Solicitar asesoría
          </button>
          <button
            className="btn-outline"
            onClick={() => navigate("/servicios")}
            style={{ padding: "10px 18px" }}
          >
            Volver a Servicios
          </button>
        </div>
      </section>
    </main>
  );
}
