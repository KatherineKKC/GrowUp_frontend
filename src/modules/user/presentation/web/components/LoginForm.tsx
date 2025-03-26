import React, { useState } from "react";
import { useGetUser } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { getUser, user, error, loading } = useGetUser();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await getUser(email.trim().toLowerCase(), password);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.background}></div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Iniciar Sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Cargando..." : "Entrar"}
        </button>

        <button
          type="button"
          style={styles.secondaryButton}
          onClick={() => navigate("/register")}
        >
          Crear cuenta nueva
        </button>

        <button
          type="button"
          style={styles.secondaryButton}
          onClick={() => navigate("/google")}
        >
          Iniciar sesión con Google
        </button>

        {error && <p style={styles.error}>{error}</p>}
        {user && (
          <p style={styles.success}>
            Bienvenido, {user.displayName || "Usuario"}!
          </p>
        )}
      </form>
    </div>
  );
};

const styles = {
  wrapper: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    backgroundColor: "#fff0f6",
    overflow: "hidden",
  } as React.CSSProperties,

  background: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "50%",
    background: "linear-gradient(to top, #ec4899, #f472b6)",
    zIndex: 0,
  } as React.CSSProperties,

  form: {
    zIndex: 1,
    width: "100%",
    maxWidth: "350px",
    padding: "2rem",
    borderRadius: "16px",
    backgroundColor: "#ffffff",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  } as React.CSSProperties,

  heading: {
    textAlign: "center",
    fontSize: "1.6rem",
    color: "#be185d",
    fontWeight: "600",
  } as React.CSSProperties,

  input: {
    padding: "0.8rem 1rem",
    fontSize: "1rem",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#fdf2f8",
    outline: "none",
  } as React.CSSProperties,

  button: {
    padding: "0.8rem",
    fontSize: "1rem",
    backgroundColor: "#ec4899",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "500",
  } as React.CSSProperties,

  secondaryButton: {
    padding: "0.8rem",
    fontSize: "1rem",
    backgroundColor: "#f472b6",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "500",
  } as React.CSSProperties,

  error: {
    color: "#dc2626",
    fontWeight: "bold",
    textAlign: "center",
  } as React.CSSProperties,

  success: {
    color: "#16a34a",
    fontWeight: "bold",
    textAlign: "center",
  } as React.CSSProperties,
};

export default LoginForm;
