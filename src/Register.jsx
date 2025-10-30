import React, { useState } from "react";
import "./App.css";

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "usuario",
    vehiculo: { marca: "", modelo: "", placa: "", tarjetaPropiedad: null },
    cedulaFrontal: null,
    cedulaReverso: null,
    papelesCarro: false,
    codigo: "",
  });

  const [codigoGenerado, setCodigoGenerado] = useState("");
  const [codigoVerificado, setCodigoVerificado] = useState(false);
  const [alerta, setAlerta] = useState("");

  // =================== HANDLERS ===================
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file && file.size > 5 * 1024 * 1024) {
        setAlerta("⚠️ El archivo no debe superar los 5 MB.");
        return;
      }
      setFormData((prev) => ({ ...prev, [name]: file }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleVehiculoChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file && file.size > 5 * 1024 * 1024) {
        setAlerta("⚠️ El archivo no debe superar los 5 MB.");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        vehiculo: { ...prev.vehiculo, [name]: file },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        vehiculo: { ...prev.vehiculo, [name]: value },
      }));
    }
  };

  // =================== CÓDIGO DE VERIFICACIÓN ===================
  const enviarCodigo = () => {
    if (!formData.telefono || formData.telefono.length < 7) {
      setAlerta("⚠️ Ingresa un número de teléfono válido.");
      return;
    }

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    setCodigoGenerado(codigo);
    setAlerta(`✅ Código enviado al teléfono ${formData.telefono}: ${codigo}`);
  };

  const verificarCodigo = () => {
    if (formData.codigo === codigoGenerado) {
      setCodigoVerificado(true);
      setAlerta("✅ Teléfono verificado correctamente.");
    } else {
      setAlerta("⚠️ Código incorrecto. Intenta nuevamente.");
    }
  };

  // =================== ENVÍO DEL FORMULARIO ===================
  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      nombre,
      apellido,
      telefono,
      email,
      password,
      confirmPassword,
      rol,
      vehiculo,
      papelesCarro,
      cedulaFrontal,
      cedulaReverso,
    } = formData;

    if (!nombre || !apellido || !telefono || !email || !password || !confirmPassword) {
      setAlerta("⚠️ Todos los campos son obligatorios.");
      return;
    }

    if (!email.includes("@")) {
      setAlerta("⚠️ Ingresa un correo válido.");
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

    if (!codigoVerificado) {
      setAlerta("⚠️ Debes verificar tu número de teléfono antes de continuar.");
      return;
    }

    if (rol === "conductor") {
      if (!vehiculo.marca || !vehiculo.modelo || !vehiculo.placa) {
        setAlerta("⚠️ Todos los datos del vehículo son obligatorios.");
        return;
      }
      if (!vehiculo.tarjetaPropiedad) {
        setAlerta("⚠️ Debes subir la tarjeta de propiedad del vehículo (para verificar que es tuyo).");
        return;
      }
      if (!cedulaFrontal || !cedulaReverso) {
        setAlerta("⚠️ Debes subir las fotos de tu cédula (ambas caras).");
        return;
      }
      if (!papelesCarro) {
        setAlerta("⚠️ Debes confirmar que los papeles del carro están al día.");
        return;
      }
    }

    // ============ GUARDAR EN LOCALSTORAGE ===============
    const nuevoUsuario = {
      id: Date.now(),
      nombre,
      apellido,
      telefono,
      email,
      password,
      rol,
      vehiculo: rol === "conductor" ? vehiculo : null,
      cedulaFrontal: cedulaFrontal ? cedulaFrontal.name : null,
      cedulaReverso: cedulaReverso ? cedulaReverso.name : null,
      papelesCarro: rol === "conductor" ? papelesCarro : null,
    };

    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuariosGuardados.find((u) => u.email === email);
    if (existe) {
      setAlerta("⚠️ Este correo ya está registrado.");
      return;
    }

    usuariosGuardados.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

    console.log("✅ Usuarios guardados:", usuariosGuardados);
    setAlerta("✅ Registro exitoso. ¡Bienvenido a MoviFlex!");

    setTimeout(() => {
      window.location.href = "/login";
    }, 2500);
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
          <input type="text" placeholder="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} className="input-login" />
          <input type="text" placeholder="Apellido" name="apellido" value={formData.apellido} onChange={handleChange} className="input-login" />
          <input type="tel" placeholder="Teléfono" name="telefono" value={formData.telefono} onChange={handleChange} className="input-login" />

          <div style={{ display: "flex", gap: "6px" }}>
            <button type="button" onClick={enviarCodigo} className="btn-login-moviflex" style={{ width: "50%" }}>
              Enviar código
            </button>
            <input type="text" placeholder="Código" name="codigo" value={formData.codigo} onChange={handleChange} className="input-login" style={{ width: "40%" }} />
            <button type="button" onClick={verificarCodigo} className="btn-login-moviflex" style={{ width: "30%" }}>
              ✔
            </button>
          </div>

          <input type="email" placeholder="Correo electrónico" name="email" value={formData.email} onChange={handleChange} className="input-login" />
          <input type="password" placeholder="Contraseña" name="password" value={formData.password} onChange={handleChange} className="input-login" />
          <input type="password" placeholder="Confirmar contraseña" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="input-login" />

          <select className="input-login" name="rol" value={formData.rol} onChange={handleChange}>
            <option value="usuario">Usuario</option>
            <option value="conductor">Conductor</option>
          </select>

          {formData.rol === "conductor" && (
            <div className="vehiculo-section">
              <h4>🚗 Datos del vehículo</h4>
              <input type="text" placeholder="Marca" name="marca" value={formData.vehiculo.marca} onChange={handleVehiculoChange} className="input-login" />
              <input type="text" placeholder="Modelo" name="modelo" value={formData.vehiculo.modelo} onChange={handleVehiculoChange} className="input-login" />
              <input type="text" placeholder="Placa" name="placa" value={formData.vehiculo.placa} onChange={handleVehiculoChange} className="input-login" />

              <p style={{ fontWeight: "500", marginTop: "10px" }}>📄 Tarjeta de propiedad del vehículo</p>
              <input type="file" name="tarjetaPropiedad" accept="image/*" onChange={handleVehiculoChange} className="input-login" />

              <p style={{ fontWeight: "500", marginTop: "10px" }}>🪪 Cédula del conductor (frontal y reverso)</p>
              <input type="file" name="cedulaFrontal" accept="image/*" onChange={handleChange} className="input-login" />
              <input type="file" name="cedulaReverso" accept="image/*" onChange={handleChange} className="input-login" />

              <label style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "10px" }}>
                <input type="checkbox" name="papelesCarro" checked={formData.papelesCarro} onChange={handleChange} />
                Confirmo que los papeles del carro están al día.
              </label>
            </div>
          )}

          <button type="submit" className="btn-login-moviflex">Registrarse</button>
        </form>

        <div className="extra-links">
          <a href="/login">¿Ya tienes cuenta? Inicia sesión</a>
        </div>
      </div>
    </div>
  );
}
