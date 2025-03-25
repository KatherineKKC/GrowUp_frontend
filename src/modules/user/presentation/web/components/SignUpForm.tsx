import React, { useState } from "react";
import { UserRepositoryImp } from "../../../infrastructure/repositories/UserRepositoryImp";
import { SignUpUserUseCase } from "../../../application/usesCase/SignUpUseCase";
const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const repo = new UserRepositoryImp();
    const useCase = new SignUpUserUseCase(repo);

    try {
      const user = await useCase.execute(email, password);
      if (user) {
        setSuccess(true);
        setError(null);
      }
    } catch (err: any) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Registro de usuario</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Registrarse</button>
      {success && <p style={{ color: "green" }}>¡Registro exitoso!</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default RegisterForm;
