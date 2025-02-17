import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from '@/use-cases/_errors/resource-not-found-error'
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile'
import { hash } from 'bcrypt'
import { expect, describe, it, beforeEach } from 'vitest'


describe('Get User Profile Use Case', () => {
    let usersRepository: InMemoryUsersRepository
    let sut: GetUserProfileUseCase

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })

    it('should be able to get user profile', async () => {
        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            passwordHash: await hash('123456', 8),
        })
        const { user } = await sut.execute({
            userId: createdUser.id,
        })
        expect(user.name).toEqual('John Doe')
    })

    it('should not be able to get user profile with wrong id', async () => {
        expect(() =>
            sut.execute({
                userId: 'non-existing-id',
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})