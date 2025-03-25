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
        onClick={() => {
          console.log("Redirigiendo a /register");
          navigate("/register");
        }}
      >
        
        Crear cuenta nueva
      </button>


       <button
        type="button"
        style={styles.secondaryButton}
        onClick={() => {
          console.log("Redirigiendo a /google");
          navigate("/google");
        }}
      >
        
        Iniciar sesion con google
      </button>
      {error && <p style={styles.error}>{error}</p>}
      {user && (
        <p style={styles.success}>Bienvenido, {user.displayName || "Usuario"}!</p>
      )}
    </form>
  );
};

const styles = {
  form: {
    maxWidth: "400px",
    margin: "auto",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  } as React.CSSProperties,
  heading: {
    textAlign: "center",
  } as React.CSSProperties,
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
  } as React.CSSProperties,
  button: {
    padding: "0.7rem",
    fontSize: "1rem",
    cursor: "pointer",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
  } as React.CSSProperties,
  secondaryButton: {
    padding: "0.7rem",
    fontSize: "1rem",
    cursor: "pointer",
    backgroundColor: "#2196f3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
  } as React.CSSProperties,
  error: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  } as React.CSSProperties,
  success: {
    color: "green",
    fontWeight: "bold",
    textAlign: "center",
  } as React.CSSProperties,
};

export default LoginForm;
