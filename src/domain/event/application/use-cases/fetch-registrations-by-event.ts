import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { Registration } from '@/domain/event/enterprise/entities/registration'
import { RegistrationsRepository } from '../repositories/registrations-repository'

interface FetchRegistrationsByEventUseCaseRequest {
  eventId: string
  page: number
}

type FetchRegistrationsByEventUseCaseResponse = Either<
  null,
  {
    registrations: Registration[]
  }
>

@Injectable()
export class FetchRegistrationsByEventUseCase {
  constructor(private registrationsRepository: RegistrationsRepository) {}

  async execute({
    eventId,
    page,
  }: FetchRegistrationsByEventUseCaseRequest): Promise<FetchRegistrationsByEventUseCaseResponse> {
    const registrations =
      await this.registrationsRepository.findManyByEventId(eventId, { page })

    return right({ registrations })
  }
}
