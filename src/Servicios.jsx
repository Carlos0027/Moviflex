import React, { useState, useEffect } from "react";
import "./App.css";


export default function Servicios() {
  const [usuario, setUsuario] = useState(null);
  const [conductores, setConductores] = useState([]);
  const [solicitud, setSolicitud] = useState({
    origen: "",
    destino: "",
    distancia: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioActivo"));
    setUsuario(user);

    const disponibles =
      JSON.parse(localStorage.getItem("conductoresActivos")) || [];
    setConductores(disponibles);
  }, []);

  const publicarViaje = () => {
    if (!solicitud.origen || !solicitud.destino || !solicitud.distancia) {
      alert("Completa origen, destino y distancia estimada (km)");
      return;
    }

    const nuevoViaje = {
      id: Date.now(),
      conductor: usuario.nombre,
      origen: solicitud.origen,
      destino: solicitud.destino,
      distancia: Number(solicitud.distancia),
    };

    const actualizados = [...conductores, nuevoViaje];
    setConductores(actualizados);
    localStorage.setItem("conductoresActivos", JSON.stringify(actualizados));

    setSolicitud({ origen: "", destino: "", distancia: "" });
    alert("✅ Viaje publicado para la comunidad");
  };

  const calcularPrecio = (distanciaUsuario, distanciaConductor) => {
    const base = 2500;
    const precio = base * (distanciaUsuario / distanciaConductor) * 0.7;
    return precio.toFixed(0);
  };

  return (
    <div className="servicios-container">
      <header className="servicios-header">
        <h1>🚗 MoviFlex Comunitario</h1>
        <p>
          {usuario?.rol === "conductor"
            ? "Publica tu viaje para que otros usuarios puedan unirse a tu ruta"
            : "Encuentra viajes cercanos con precios más accesibles"}
        </p>
      </header>

      {usuario?.rol === "conductor" && (
        <section className="crear-servicio card">
          <h2>🧭 Publicar viaje</h2>
          <input
            type="text"
            placeholder="Origen"
            value={solicitud.origen}
            onChange={(e) =>
              setSolicitud({ ...solicitud, origen: e.target.value })
            }
            className="input-login"
          />
          <input
            type="text"
            placeholder="Destino"
            value={solicitud.destino}
            onChange={(e) =>
              setSolicitud({ ...solicitud, destino: e.target.value })
            }
            className="input-login"
          />
          <input
            type="number"
            placeholder="Distancia total (km)"
            value={solicitud.distancia}
            onChange={(e) =>
              setSolicitud({ ...solicitud, distancia: e.target.value })
            }
            className="input-login"
          />
          <button className="btn-login-moviflex" onClick={publicarViaje}>
            Publicar viaje
          </button>
        </section>
      )}

      {usuario?.rol === "usuario" && (
        <section className="ver-viajes">
          <h2>🛣️ Viajes disponibles</h2>
          {conductores.length === 0 ? (
            <p>No hay viajes publicados por ahora.</p>
          ) : (
            conductores.map((c) => (
              <div key={c.id} className="servicio-card card">
                <h3>Conductor: {c.conductor}</h3>
                <p>
                  {c.origen} → {c.destino} ({c.distancia} km)
                </p>
                <label>Tu distancia estimada con esta ruta (km):</label>
                <input
                  type="number"
                  min="1"
                  max={c.distancia}
                  onChange={(e) =>
                    setSolicitud((prev) => ({
                      ...prev,
                      [c.id]: e.target.value,
                    }))
                  }
                  placeholder="Ej: 5"
                  className="input-login"
                />
                <button
                  className="btn-outline"
                  onClick={() =>
                    alert(
                      `💰 Precio estimado: $${calcularPrecio(
                        solicitud[c.id] || 1,
                        c.distancia
                      )}`
                    )
                  }
                >
                  Calcular precio compartido
                </button>
              </div>
            ))
          )}
        </section>
      )}
    </div>
  );
}
