/**
 * User repository implementation
 * Responsabilidades : Adquirir los datos de los usuarios de la base de datos
 */

import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { toDomain } from "../mappers/UserMapper";
import { UserResponse } from "../entities/UserResponse";
import { db } from "../../../../shared/infrastructure/database/AppDatabase";
import { auth } from "../../../../shared/infrastructure/firebase/firebase";

export class UserRepositoryImp implements UserRepository {
  async signUpWithEmail(email: string, password: string): Promise<User | null> {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = result.user;

    const mappedUser: User = toDomain({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
    } as UserResponse);

    await db.users.add(mappedUser);
    return mappedUser;
  }

  async loginWithEmail(email: string, password: string): Promise<User | null> {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = result.user;
    if (!firebaseUser) return null;

    const mappedUser: User = toDomain({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
    } as UserResponse);

    const userExists = await db.users.get(mappedUser.idFirebaseUser);
    if (!userExists) {
      await db.users.add(mappedUser);
    }

    return mappedUser;
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await db.users.get(id);
    return user ?? null;
  }

  async deleteUserById(id: string): Promise<void> {
    await db.users.delete(id);
    const user = auth.currentUser;
    if (user?.uid === id) {
      await deleteUser(user);
    }
  }

  async signOut(): Promise<void> {
    await signOut(auth);
  }
}
