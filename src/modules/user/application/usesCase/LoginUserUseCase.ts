/**
 * LoginUserUseCase
 * Responsabilidades : Mediar la autenticación de un usuario entre la capa de dominio y la capa de infraestructura
 */

import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class LogingUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<User | null> {
    return await this.userRepository.loginWithEmail(email, password);
  }
}
