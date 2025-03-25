import { useState } from "react";
import { User } from "../../../domain/entities/User";
import { UserRepositoryImp } from "../../../infrastructure/repositories/UserRepositoryImp";
import { LogingUserUseCase } from "../../../application/usesCase/LoginUserUseCase";

export function useGetUser() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getUser = async (email: string, password: string) => {
    setLoading(true);
    const repo = new UserRepositoryImp();
    const useCase = new LogingUserUseCase(repo);

    try {
      const result = await useCase.execute(email, password);
      if (!result) {
        setError("Credenciales incorrectas");
        setUser(null);
      } else {
        setUser(result);
        setError(null);
      }
    } catch (e) {
      setError("Error al autenticar usuario");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return { getUser, user, error, loading };
}
