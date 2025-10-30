import React from "react";
import "./App.css";

export default function HomeMoviflex() {
  return (
    <div className="moviflex-container">
      <section className="hero">
        <div className="hero-text">
          <h1>Muévete con <span className="highlight">MoviFlex</span></h1>
          <p>Tu movilidad más rápida, económica y segura.</p>
          <div className="buttons">
            <a href="/register" className="btn btn-primary">Regístrate</a>
            <a href="/login" className="btn btn-outline">Iniciar sesión</a>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.pexels.com/photos/13827493/pexels-photo-13827493.jpeg"
            alt="Auto MoviFlex"
          />
        </div>
      </section>
    </div>
  );
}