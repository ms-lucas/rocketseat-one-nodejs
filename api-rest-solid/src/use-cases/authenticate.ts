import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from '@/use-cases/_errors/invalid-credentials-error'
import { User } from '@prisma/client'
import { compare } from 'bcrypt'
interface AuthenticateUseCaseRequest {
  email: string
  password: string
}
interface AuthenticateUseCaseResponse {
  user: User
}
export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new InvalidCredentialsError()
    }
    const doestPasswordMatches = await compare(password, user.passwordHash)
    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError()
    }
    return {
      user,
    }
  }
}