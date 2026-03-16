import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Registration } from '@/domain/event/enterprise/entities/registration'
import { EventsRepository } from '../repositories/events-repository'
import { RegistrationsRepository } from '../repositories/registrations-repository'
import { CongregationsRepository } from '../repositories/congregations-repository'
import { EventFullError } from './errors/event-full-error'
import { CpfAlreadyRegisteredError } from './errors/cpf-already-registered-error'
import { CongregationNotInRegionalError } from './errors/congregation-not-in-regional-error'
import { EventNotActiveError } from './errors/event-not-active-error'

interface RegisterParticipantUseCaseRequest {
  name: string
  cpf: string
  phone: string
  email: string
  extraLunch: boolean
  eventId: string
  regionalId: string
  congregationId: string
}

type RegisterParticipantUseCaseResponse = Either<
  | ResourceNotFoundError
  | EventNotActiveError
  | EventFullError
  | CpfAlreadyRegisteredError
  | CongregationNotInRegionalError,
  {
    registration: Registration
  }
>

@Injectable()
export class RegisterParticipantUseCase {
  constructor(
    private eventsRepository: EventsRepository,
    private registrationsRepository: RegistrationsRepository,
    private congregationsRepository: CongregationsRepository,
  ) {}

  async execute({
    name,
    cpf,
    phone,
    email,
    extraLunch,
    eventId,
    regionalId,
    congregationId,
  }: RegisterParticipantUseCaseRequest): Promise<RegisterParticipantUseCaseResponse> {
    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      return left(new ResourceNotFoundError())
    }

    if (!event.isActive) {
      return left(new EventNotActiveError())
    }

    const count = await this.registrationsRepository.countByEventId(eventId)

    if (count >= event.maxParticipants) {
      return left(new EventFullError())
    }

    const existing =
      await this.registrationsRepository.findByCpfAndEventId(cpf, eventId)

    if (existing) {
      return left(new CpfAlreadyRegisteredError())
    }

    const congregation =
      await this.congregationsRepository.findById(congregationId)

    if (!congregation) {
      return left(new ResourceNotFoundError())
    }

    if (congregation.regionalId.toString() !== regionalId) {
      return left(new CongregationNotInRegionalError())
    }

    const registration = Registration.create({
      name,
      cpf,
      phone,
      email,
      extraLunch,
      eventId: new UniqueEntityID(eventId),
      regionalId: new UniqueEntityID(regionalId),
      congregationId: new UniqueEntityID(congregationId),
    })

    await this.registrationsRepository.create(registration)

    return right({ registration })
  }
}
