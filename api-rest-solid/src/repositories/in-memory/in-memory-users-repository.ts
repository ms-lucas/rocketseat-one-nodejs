import { $Enums, Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

interface CreateUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: $Enums.Role;
  createdAt?: Date;
}

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => email === user.email);

    if (!user) {
      return Promise.resolve(null);
    }

    return Promise.resolve(user);
  }

  create(data: CreateUser): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      role: data.role,
      createdAt: new Date(),
    };

    this.users.push(user);

    return Promise.resolve(user);
  }
}
