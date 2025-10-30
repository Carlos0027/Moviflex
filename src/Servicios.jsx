import React from "react";
import "./App.css";

export default function Servicios() {
  const irA = (ruta) => {
    window.location.href = ruta;
  };

  return (
    <main className="servicios-container">
      <header className="servicios-header">
        <h1>Servicios MoviFlex</h1>
        <p>
          Elige el servicio que mejor se adapte a tus necesidades. MoviFlex te
          ofrece rapidez, confianza y comodidad en cada viaje.
        </p>
      </header>

      <div className="servicios-lista">
        <div className="servicio-card">
          <h3>🚘 Viajes Compartidos</h3>
          <p>Conecta con otros pasajeros y comparte los gastos del trayecto.</p>
          <button
            className="btn-login-moviflex"
            onClick={() => irA("/buscar-viajes")}
          >
            Buscar viajes
          </button>
        </div>

        <div className="servicio-card">
          <h3>⚡ Viajes Express</h3>
          <p>
            Solicita un vehículo disponible cerca de ti para llegar más rápido a
            tu destino.
          </p>
          <button
            className="btn-login-moviflex"
            onClick={() => irA("/solicitar-viaje")}
          >
            Solicitar viaje rápido
          </button>
        </div>

        <div className="servicio-card">
          <h3>📦 Entregas Flex</h3>
          <p>
            Envía paquetes o documentos de forma segura y económica con nuestros
            conductores verificados.
          </p>
          <button
            className="btn-login-moviflex"
            onClick={() => irA("/entregas")}
          >
            Programar envío
          </button>
        </div>

        <div className="servicio-card">
          <h3>🏢 MoviFlex Corporativo</h3>
          <p>
            Soluciones de movilidad para empresas, con control de gastos y
            soporte 24/7.
          </p>
          <button
            className="btn-login-moviflex"
            onClick={() => irA("/corporativo")}
          >
            Más información
          </button>
        </div>

        <div className="servicio-card">
          <h3>💚 Movilidad Sostenible</h3>
          <p>
            Promovemos el uso de vehículos eléctricos y la reducción de emisiones
            de CO₂.
          </p>
          <button
            className="btn-login-moviflex"
            onClick={() => irA("/sostenible")}
          >
            Ver iniciativas
          </button>
        </div>
      </div>

      <div className="soporte">
        <button
          className="btn-login-moviflex"
          onClick={() => irA("/nosotros")}
        >
          Sobre Nosotros
        </button>
      </div>
    </main>
  );
}
