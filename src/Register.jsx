import React, { useState } from "react";
import "./App.css";

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "usuario",
    vehiculo: { marca: "", modelo: "", placa: "" },
  });

  const [alerta, setAlerta] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVehiculoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      vehiculo: { ...prev.vehiculo, [name]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      nombre,
      apellido,
      email,
      password,
      confirmPassword,
      rol,
      vehiculo,
    } = formData;

    // ================= VALIDACIONES =================
    if (!nombre || !apellido || !email || !password || !confirmPassword) {
      setAlerta("⚠️ Todos los campos son obligatorios.");
      return;
    }

    if (!email.includes("@")) {
      setAlerta("⚠️ Ingresa un correo electrónico válido.");
      return;
    }

    if (password.length < 6) {
      setAlerta("⚠️ La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setAlerta("⚠️ Las contraseñas no coinciden.");
      return;
    }

    if (
      rol === "conductor" &&
      (!vehiculo.marca || !vehiculo.modelo || !vehiculo.placa)
    ) {
      setAlerta("⚠️ Todos los datos del vehículo son obligatorios.");
      return;
    }

    // ================= GUARDAR EN JSON (LocalStorage) =================
    const nuevoUsuario = {
      id: Date.now(),
      nombre,
      apellido,
      email,
      password,
      rol,
      vehiculo: rol === "conductor" ? vehiculo : null,
    };

    // Recuperar usuarios anteriores (si existen)
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar si el correo ya está registrado
    const existe = usuariosGuardados.find((u) => u.email === email);
    if (existe) {
      setAlerta("⚠️ Este correo ya está registrado.");
      return;
    }

    // Agregar nuevo usuario
    usuariosGuardados.push(nuevoUsuario);

    // Guardar en LocalStorage como JSON
    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

    console.log("✅ Usuarios guardados:", usuariosGuardados);
    setAlerta("✅ Registro exitoso. ¡Bienvenido a MoviFlex!");

    // Redirigir después de registrar
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>📝 Registro MoviFlex</h2>
        <p className="subtitle">
          Crea tu cuenta y únete a <span className="highlight">MoviFlex</span>
        </p>

        {alerta && <div className="alerta">{alerta}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="input-login"
          />

          <input
            type="text"
            placeholder="Apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className="input-login"
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-login"
          />

          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input-login"
          />

          <input
            type="password"
            placeholder="Confirmar contraseña"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input-login"
          />

          <select
            className="input-login"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
          >
            <option value="usuario">Usuario</option>
            <option value="conductor">Conductor</option>
          </select>

          {formData.rol === "conductor" && (
            <div className="vehiculo-section">
              <h4>🚗 Datos del vehículo</h4>
              <input
                type="text"
                placeholder="Marca"
                name="marca"
                value={formData.vehiculo.marca}
                onChange={handleVehiculoChange}
                className="input-login"
              />
              <input
                type="text"
                placeholder="Modelo"
                name="modelo"
                value={formData.vehiculo.modelo}
                onChange={handleVehiculoChange}
                className="input-login"
              />
              <input
                type="text"
                placeholder="Placa"
                name="placa"
                value={formData.vehiculo.placa}
                onChange={handleVehiculoChange}
                className="input-login"
              />
            </div>
          )}

          <button type="submit" className="btn-login-moviflex">
            Registrarse
          </button>
        </form>

        <div className="extra-links">
          <a href="/login">¿Ya tienes cuenta? Inicia sesión</a>
        </div>
      </div>
    </div>
  );
}
