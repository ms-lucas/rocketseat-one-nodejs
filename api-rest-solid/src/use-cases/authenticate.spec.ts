import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/_errors/invalid-credentials-error'
import { hash } from 'bcrypt'
import { expect, describe, it, beforeEach } from 'vitest'


describe('Authenticate Use Case', () => {
    let inMemoryUsersRepository: InMemoryUsersRepository;
    let sut: AuthenticateUseCase;

    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository(),
            sut = new AuthenticateUseCase(inMemoryUsersRepository)
    })

    it('should be able to authenticate', async () => {

        await inMemoryUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            passwordHash: await hash('123456', 8),
        })
        const { user } = await sut.execute({
            email: 'johndoe@example.com',
            password: '123456',
        })
        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        expect(
            sut.execute({
                email: 'johndoe@example.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong email', async () => {
        await inMemoryUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            passwordHash: await hash('123456', 8),
        })
        await expect(
            sut.execute({
                email: 'johndoe@example.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})