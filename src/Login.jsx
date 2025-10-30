import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [codigo, setCodigo] = useState("");
  const [codigoGenerado, setCodigoGenerado] = useState("");
  const [verificado, setVerificado] = useState(false);
  const [recordar, setRecordar] = useState(false);
  const [alerta, setAlerta] = useState("");

  // ==================== ENVIAR CÓDIGO DE VERIFICACIÓN ====================
  const enviarCodigo = () => {
    if (!email.includes("@")) {
      setAlerta("⚠️ Ingresa un correo válido antes de solicitar el código.");
      return;
    }
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    setCodigoGenerado(codigo);
    setAlerta(`📩 Se envió un código de verificación al correo: ${email}. Código: ${codigo}`);
  };

  const verificarCodigo = () => {
    if (codigo === codigoGenerado) {
      setVerificado(true);
      setAlerta("✅ Código verificado correctamente.");
    } else {
      setAlerta("❌ Código incorrecto. Intenta nuevamente.");
    }
  };

  // ==================== INICIO DE SESIÓN ====================
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

    if (!verificado) {
      setAlerta("⚠️ Debes verificar el código enviado al correo antes de ingresar.");
      return;
    }

    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

    if (recordar) {
      localStorage.setItem("credencialesRecordadas", JSON.stringify({ email, password }));
    } else {
      localStorage.removeItem("credencialesRecordadas");
    }

    // 🔹 Determina el destino según el tipo de usuario
    const destino = usuario.tipo === "conductor" ? "/panel-conductor" : "/servicios";

    setAlerta("✅ Bienvenido, redirigiendo a tu panel...");
    setTimeout(() => navigate(destino), 1500);
  };

  // ==================== CARGAR CREDENCIALES GUARDADAS ====================
  useEffect(() => {
    const recordadas = localStorage.getItem("credencialesRecordadas");
    if (recordadas) {
      const { email, password } = JSON.parse(recordadas);
      setEmail(email);
      setPassword(password);
      setRecordar(true);
    }
  }, []);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🔐 Iniciar Sesión</h2>
        <p className="subtitle">
          Bienvenido a <span className="highlight">MoviFlex</span>
        </p>

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

          {/* BOTÓN PARA ENVIAR Y VERIFICAR CÓDIGO */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              onClick={enviarCodigo}
              className="btn-login-moviflex"
              style={{ width: "50%" }}
            >
              Enviar código
            </button>

            <input
              type="text"
              placeholder="Código"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="input-login"
              style={{ width: "40%" }}
            />

            <button
              type="button"
              onClick={verificarCodigo}
              className="btn-login-moviflex"
              style={{ width: "30%" }}
            >
              ✔
            </button>
          </div>

          {/* OPCIÓN RECORDAR DATOS */}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              margin: "10px 0",
            }}
          >
            <input
              type="checkbox"
              checked={recordar}
              onChange={(e) => setRecordar(e.target.checked)}
            />
            Recordar usuario y contraseña
          </label>

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
