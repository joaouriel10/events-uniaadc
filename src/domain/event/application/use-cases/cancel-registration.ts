import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { RegistrationsRepository } from '../repositories/registrations-repository'

interface CancelRegistrationUseCaseRequest {
  registrationId: string
}

type CancelRegistrationUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class CancelRegistrationUseCase {
  constructor(private registrationsRepository: RegistrationsRepository) {}

  async execute({
    registrationId,
  }: CancelRegistrationUseCaseRequest): Promise<CancelRegistrationUseCaseResponse> {
    const registration =
      await this.registrationsRepository.findById(registrationId)

    if (!registration) {
      return left(new ResourceNotFoundError())
    }

    await this.registrationsRepository.delete(registration)

    return right(null)
  }
}
