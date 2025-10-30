import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function Sostenible() {
  const navigate = useNavigate();

  const apoyar = () => {
    alert("Gracias por apoyar la movilidad sostenible 🌱 — tu aporte ayuda a reducir emisiones.");
    // puedes guardar estadísticas locales si quieres
    const apoyos = JSON.parse(localStorage.getItem("apoyosSostenible")) || [];
    apoyos.push({ id: Date.now(), fecha: new Date().toISOString() });
    localStorage.setItem("apoyosSostenible", JSON.stringify(apoyos));
  };

  return (
    <main className="servicios-container">
      <header className="servicios-header">
        <h1>💚 Movilidad Sostenible</h1>
        <p>Conoce nuestras iniciativas para reducir emisiones y promover movilidad limpia dentro de la comunidad <span className="highlight">MoviFlex</span>.</p>
      </header>

      <section className="soporte" style={{ maxWidth: 900, margin: "30px auto" }}>
        <h3>Iniciativas</h3>
        <ul style={{ textAlign: "left", marginLeft: 24 }}>
          <li>Incentivos para conductores con vehículos eléctricos o híbridos</li>
          <li>Programas de reforestación por cada 1000 km recorridos</li>
          <li>Promoción de viajes compartidos para reducir emisiones por pasajero</li>
        </ul>

        <h3 style={{ marginTop: 20 }}>Cómo puedes ayudar</h3>
        <ol style={{ textAlign: "left", marginLeft: 24 }}>
          <li>Elige compartir viajes cuando sea posible.</li>
          <li>Prefiere opciones con vehículos eléctricos.</li>
          <li>Comparte iniciativas en redes y ayuda a crecer la comunidad.</li>
        </ol>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20 }}>
          <button className="btn-login-moviflex" onClick={apoyar}>
            Apoyar iniciativa
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
