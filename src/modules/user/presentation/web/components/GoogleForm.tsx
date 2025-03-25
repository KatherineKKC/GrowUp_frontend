import React from "react";
import {  GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../../../shared/infrastructure/firebase/firebase";

const GoogleForm: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      console.log("✅ Usuario autenticado con Google:", result.user.email);
      console.log("🎟️ Token JWT:", token);

      // Redirige a la ruta protegida
      navigate("/protected");
    } catch (error) {
      console.error("❌ Error al iniciar sesión con Google:", error);
    }
  };

  return (
    <button onClick={handleGoogleLogin} style={styles.button}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Google_favicon_2015.png"
        alt="Google logo"
        style={styles.icon}
      />
      Continuar con Google
    </button>
  );
};

const styles = {
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    width: "100%",
    padding: "0.8rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    cursor: "pointer",
    marginBottom: "1rem",
  } as React.CSSProperties,
  icon: {
    width: "20px",
    height: "20px",
  },
};

export default GoogleForm;
