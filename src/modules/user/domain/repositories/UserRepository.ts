/**User repository interface
 * Responsabilidades : Instanciar los metodos que se usaran en el repositorio
 */

import { User } from "../entities/User";

export interface UserRepository {
  loginWithEmail(email: string, password: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
  deleteUserById(id: string): Promise<void>;
  signOut(): Promise<void>;
  signUpWithEmail(email: string, password: string): Promise<User | null>;
}
