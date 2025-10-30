import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

export default function Pasajero() {
  return (
    <div className="pasajero-container">
      {/* Hero principal */}
      <section className="pasajero-hero">
        <div className="hero-text">
          <h1>
            Viaja seguro, rápido y cómodo con <span className="highlight">MoviFlex</span>
          </h1>
          <p>
            La nueva forma de moverte por tu ciudad. Conecta con conductores
            verificados, precios justos y un servicio confiable.
          </p>
          <div className="buttons">
            <button className="btn-primary">Descargar App</button>
            <Link to="/servicios">
              <button className="btn-outline">Conoce nuestros servicios</button>
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7439/7439774.png"
            alt="MoviFlex Car"
          />
        </div>
      </section>

      {/* Sección beneficios */}
      <section className="beneficios">
        <h2>¿Por qué elegir MoviFlex?</h2>
        <div className="beneficios-lista">
          <div className="beneficio-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4762/4762310.png"
              alt="Seguridad"
            />
            <h3>Seguridad ante todo</h3>
            <p>
              Conductores verificados y monitoreo en tiempo real para garantizar
              tu tranquilidad en cada viaje.
            </p>
          </div>
          <div className="beneficio-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1534/1534951.png"
              alt="Ahorro"
            />
            <h3>Precios accesibles</h3>
            <p>
              MoviFlex te ofrece tarifas competitivas sin sacrificar la
              calidad del servicio.
            </p>
          </div>
          <div className="beneficio-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3468/3468371.png"
              alt="Comodidad"
            />
            <h3>Comodidad y rapidez</h3>
            <p>
              Solicita tu viaje en segundos y disfruta de un trayecto eficiente
              con autos modernos y limpios.
            </p>
          </div>
        </div>
      </section>

      {/* Sección llamada a la acción */}
      <section className="cta">
        <h2>¿Listo para tu próximo viaje?</h2>
        <p>Únete a miles de usuarios que confían en MoviFlex.</p>
        <Link to="/login">
          <button className="btn-login-moviflex">Inicia tu experiencia</button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 MoviFlex - Todos los derechos reservados</p>
        <div className="footer-links">
          <Link to="/nosotros">Sobre Nosotros</Link>
          <Link to="/soporte">Soporte</Link>
        </div>
      </footer>
    </div>
  );
}
