import { User } from "../../domain/entities/User";
import { UserResponse } from "../entities/UserResponse";

export function toDomain(user: UserResponse): User {
  return {
    idFirebaseUser: user.uid,
    email: user.email ?? "sin-email",
    displayName: user.displayName ?? "Sin nombre",
    imagePath: user.photoURL ?? "",
  };
}
