import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function Entregas() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombreRemitente: "",
    telefono: "",
    direccionRecogida: "",
    direccionEntrega: "",
    descripcion: "",
    fecha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validarTelefono = (tel) => {
    // mínimo 7 dígitos, solo números y espacios permitidos
    return /^[0-9\s\-+]{7,}$/.test(tel);
  };

  const programarEnvio = (e) => {
    e.preventDefault();

    if (
      !form.nombreRemitente.trim() ||
      !form.telefono.trim() ||
      !form.direccionRecogida.trim() ||
      !form.direccionEntrega.trim()
    ) {
      alert("Por favor completa los campos obligatorios (nombre, teléfono, direcciones).");
      return;
    }

    if (!validarTelefono(form.telefono)) {
      alert("Ingresa un teléfono válido (mínimo 7 dígitos).");
      return;
    }

    const envios = JSON.parse(localStorage.getItem("enviosMoviflex")) || [];
    const nuevo = {
      id: Date.now(),
      ...form,
      estado: "Programado",
      creado: new Date().toISOString(),
    };

    envios.push(nuevo);
    localStorage.setItem("enviosMoviflex", JSON.stringify(envios));

    alert("✅ Envío programado correctamente.");
    // limpiar formulario y volver a servicios
    setForm({
      nombreRemitente: "",
      telefono: "",
      direccionRecogida: "",
      direccionEntrega: "",
      descripcion: "",
      fecha: "",
    });
    navigate("/servicios");
  };

  return (
    <main className="servicios-container">
      <header className="servicios-header">
        <h1>📦 Entregas Flex</h1>
        <p>Programa un envío seguro con conductores verificados de <span className="highlight">MoviFlex</span>.</p>
      </header>

      <section className="form-container" style={{ maxWidth: 720 }}>
        <form onSubmit={programarEnvio}>
          <input
            className="input-field"
            name="nombreRemitente"
            placeholder="Nombre del remitente *"
            value={form.nombreRemitente}
            onChange={handleChange}
          />
          <input
            className="input-field"
            name="telefono"
            placeholder="Teléfono de contacto *"
            value={form.telefono}
            onChange={handleChange}
          />
          <input
            className="input-field"
            name="direccionRecogida"
            placeholder="Dirección de recogida *"
            value={form.direccionRecogida}
            onChange={handleChange}
          />
          <input
            className="input-field"
            name="direccionEntrega"
            placeholder="Dirección de entrega *"
            value={form.direccionEntrega}
            onChange={handleChange}
          />
          <input
            className="input-field"
            name="fecha"
            type="date"
            placeholder="Fecha (opcional)"
            value={form.fecha}
            onChange={handleChange}
          />
          <textarea
            className="input-field"
            name="descripcion"
            placeholder="Descripción del paquete (peso, dimensiones, etc.)"
            rows="4"
            value={form.descripcion}
            onChange={handleChange}
          />
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button className="btn-login-moviflex" type="submit">
              Programar envío
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
