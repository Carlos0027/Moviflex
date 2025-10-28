import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (!usuario) {
      setAlerta("❌ Usuario o contraseña incorrectos.");
      return;
    }

    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    setAlerta("✅ Bienvenido, redirigiendo a los servicios...");

    // 🔁 Redirección
    setTimeout(() => {
      navigate("/servicios");
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🔐 Iniciar Sesión</h2>
        {alerta && <div className="alerta">{alerta}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-login"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-login"
          />
          <button type="submit" className="btn-login-moviflex">
            Entrar
          </button>
        </form>
        <div className="extra-links">
          <a href="/register">¿No tienes cuenta? Regístrate</a>
        </div>
      </div>
    </div>
  );
}
