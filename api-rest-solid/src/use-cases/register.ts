import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcrypt";
import { UserAlreadyExistsError } from "./_errors/user-already-exists-error";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError("Email already exists.");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({ name, email, passwordHash });
  }
}
