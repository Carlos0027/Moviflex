import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function PanelConductor() {
  const navigate = useNavigate();
  const [viajes, setViajes] = useState(
    JSON.parse(localStorage.getItem("viajesPublicados")) || []
  );
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoViaje, setNuevoViaje] = useState({
    origen: "",
    destino: "",
    hora: "",
    precio: "",
    asientos: "",
  });

  // ==================== MANEJAR CAMBIOS EN EL FORMULARIO ====================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoViaje({ ...nuevoViaje, [name]: value });
  };

  // ==================== PUBLICAR VIAJE ====================
  const publicarViaje = (e) => {
    e.preventDefault();

    if (!nuevoViaje.origen || !nuevoViaje.destino || !nuevoViaje.hora || !nuevoViaje.precio) {
      alert("⚠️ Por favor completa todos los campos obligatorios.");
      return;
    }

    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    const viajeConductor = {
      ...nuevoViaje,
      id: Date.now(),
      conductor: usuarioActivo?.nombre || "Conductor Anónimo",
      email: usuarioActivo?.email,
      vehiculo: usuarioActivo?.vehiculo || "Sin vehículo registrado",
      placas: usuarioActivo?.placas || "N/A",
    };

    const viajesActualizados = [...viajes, viajeConductor];
    setViajes(viajesActualizados);
    localStorage.setItem("viajesPublicados", JSON.stringify(viajesActualizados));
    setMostrarFormulario(false);
    setNuevoViaje({ origen: "", destino: "", hora: "", precio: "", asientos: "" });

    alert("✅ Viaje publicado exitosamente.");
  };

  return (
    <div className="buscar-viajes-container">
      <h1>🚘 Panel del Conductor</h1>
      <p>Administra tus viajes y publicaciones en <span className="highlight">MoviFlex</span></p>

      {/* BOTÓN PARA ABRIR FORMULARIO */}
      {!mostrarFormulario && (
        <button
          className="btn-login-moviflex"
          onClick={() => setMostrarFormulario(true)}
          style={{ width: "220px", marginBottom: "25px" }}
        >
          ➕ Publicar Viaje
        </button>
      )}

      {/* FORMULARIO PARA PUBLICAR VIAJE */}
      {mostrarFormulario && (
        <div
          className="form-container"
          style={{ maxWidth: "420px", textAlign: "left" }}
        >
          <h3>📝 Publicar nuevo viaje</h3>
          <form onSubmit={publicarViaje}>
            <input
              type="text"
              name="origen"
              placeholder="Origen"
              value={nuevoViaje.origen}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="text"
              name="destino"
              placeholder="Destino"
              value={nuevoViaje.destino}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="time"
              name="hora"
              placeholder="Hora de salida"
              value={nuevoViaje.hora}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="number"
              name="precio"
              placeholder="Precio (COP)"
              value={nuevoViaje.precio}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="number"
              name="asientos"
              placeholder="Asientos disponibles"
              value={nuevoViaje.asientos}
              onChange={handleChange}
              className="input-field"
            />

            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button type="submit" className="btn-login-moviflex" style={{ width: "50%" }}>
                Publicar
              </button>
              <button
                type="button"
                className="btn-register"
                style={{ width: "50%" }}
                onClick={() => setMostrarFormulario(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* LISTA DE VIAJES PUBLICADOS */}
      <div className="viajes-lista">
        {viajes.length === 0 ? (
          <p>No has publicado viajes todavía.</p>
        ) : (
          viajes.map((v) => (
            <div key={v.id} className="viaje-card">
              <h3>🚗 {v.origen} → {v.destino}</h3>
              <p><strong>Hora:</strong> {v.hora}</p>
              <p><strong>Precio:</strong> ${v.precio}</p>
              <p><strong>Asientos:</strong> {v.asientos || "N/D"}</p>
              <p><strong>Vehículo:</strong> {v.vehiculo}</p>
              <p><strong>Placas:</strong> {v.placas}</p>
              <p><strong>Conductor:</strong> {v.conductor}</p>
            </div>
          ))
        )}
      </div>

      <button
        className="btn-outline"
        onClick={() => navigate("/login")}
        style={{ marginTop: "40px" }}
      >
        ⬅ Cerrar sesión
      </button>
    </div>
  );
}
