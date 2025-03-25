import React, { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const ProtectedData: React.FC = () => {
  const { token, loading } = useAuth();

  useEffect(() => {
    if (!loading && token) {
      axios
        .get("http://localhost:3000/api/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("✅ Respuesta del backend:", res.data);
        })
        .catch((err) => {
          console.error("❌ Error al llamar al backend:", err.message);
          if (err.response) {
            console.error("📦 Respuesta del backend:", err.response.data);
            console.error("📦 Código de estado:", err.response.status);
          }
        });
        
    }
  }, [token, loading]);

  return <p>🔒 Consultando datos protegidos del backend...</p>;
};

export default ProtectedData;
