import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { User } from "../../../domain/entities/User";

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  logout: () => Promise<void>;
};

export const useAuth = (): AuthState => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();
        setToken(idToken);

        setUser({
          idFirebaseUser: firebaseUser.uid,
          email: firebaseUser.email || "",
          displayName: firebaseUser.displayName || "",
          imagePath: firebaseUser.photoURL || "",
        });
      } else {
        setUser(null);
        setToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Aquí está el useEffect correcto para mostrar el token en consola
  useEffect(() => {
    if (token) {
      console.log("🎟️ TOKEN JWT enviado al backend:", token);
    }
  }, [token]);

  const logout = async () => {
    await signOut(getAuth());
    setUser(null);
    setToken(null);
  };

  return { user, token, loading, logout };
};
