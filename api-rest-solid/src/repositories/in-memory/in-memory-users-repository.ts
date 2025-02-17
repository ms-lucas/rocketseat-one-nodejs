import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {

  public users: User[] = [];

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id)
    if (!user) {
      return null
    }
    return Promise.resolve(user)
  }

  findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => email === user.email);

    if (!user) {
      return Promise.resolve(null);
    }

    return Promise.resolve(user);
  }

  create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      role: data.role ? data.role : 'MEMBER',
      createdAt: new Date()
    }
    
    this.users.push(user);

    return Promise.resolve(user);
  }
}
