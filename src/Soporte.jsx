import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function Soporte() {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({ nombre: "", email: "", asunto: "", detalle: "" });

  const validarEmail = (email) => {
    // validación simple de correo
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const enviar = (e) => {
    e.preventDefault();
    if (!mensaje.nombre.trim() || !mensaje.email.trim() || !mensaje.asunto.trim()) {
      alert("Por favor completa nombre, email y asunto.");
      return;
    }
    if (!validarEmail(mensaje.email)) {
      alert("Ingresa un correo válido.");
      return;
    }

    const tickets = JSON.parse(localStorage.getItem("ticketsSoporte")) || [];
    tickets.push({
      id: Date.now(),
      ...mensaje,
      estado: "Abierto",
      creado: new Date().toISOString(),
    });
    localStorage.setItem("ticketsSoporte", JSON.stringify(tickets));

    alert("✅ Tu mensaje fue enviado. Nuestro equipo de soporte te contactará pronto.");
    setMensaje({ nombre: "", email: "", asunto: "", detalle: "" });
    navigate("/servicios");
  };

  return (
    <main className="servicios-container">
      <header className="servicios-header">
        <h1>📞 Soporte MoviFlex</h1>
        <p>Estamos aquí para ayudarte. Envía tu consulta y te responderemos pronto.</p>
      </header>

      <section className="form-container" style={{ maxWidth: 720 }}>
        <form onSubmit={enviar}>
          <input
            className="input-field"
            name="nombre"
            placeholder="Nombre *"
            value={mensaje.nombre}
            onChange={(e) => setMensaje({ ...mensaje, nombre: e.target.value })}
          />
          <input
            className="input-field"
            name="email"
            placeholder="Correo electrónico *"
            value={mensaje.email}
            onChange={(e) => setMensaje({ ...mensaje, email: e.target.value })}
          />
          <input
            className="input-field"
            name="asunto"
            placeholder="Asunto *"
            value={mensaje.asunto}
            onChange={(e) => setMensaje({ ...mensaje, asunto: e.target.value })}
          />
          <textarea
            className="input-field"
            name="detalle"
            placeholder="Describe tu consulta (opcional)"
            rows="5"
            value={mensaje.detalle}
            onChange={(e) => setMensaje({ ...mensaje, detalle: e.target.value })}
          />
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button className="btn-login-moviflex" type="submit">
              Enviar mensaje
            </button>
            <button
              type="button"
              className="btn-outline"
              onClick={() => navigate("/servicios")}
              style={{ padding: "10px 18px" }}
            >
              Volver a Servicios
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
