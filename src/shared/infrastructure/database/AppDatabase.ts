import Dexie, { Table } from "dexie";
import { User } from "../../../modules/user/domain/entities/User";

export class AppDatabase extends Dexie {
  users!: Table<User, string>; // string = tipo de clave primaria

  constructor() {
    super("GrowUpDatabase");

    this.version(1).stores({
      users: "idFirebaseUser,email, imagePath", // índice por id y email
    });
  }
}

export const db = new AppDatabase();
