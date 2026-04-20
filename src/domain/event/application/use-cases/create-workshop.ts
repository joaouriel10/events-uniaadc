import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Workshop } from '@/domain/event/enterprise/entities/workshop'
import { WorkshopsRepository } from '../repositories/workshops-repository'
import { EventsRepository } from '../repositories/events-repository'

interface CreateWorkshopUseCaseRequest {
  name: string
  description?: string
  eventId: string
}

type CreateWorkshopUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    workshop: Workshop
  }
>

@Injectable()
export class CreateWorkshopUseCase {
  constructor(
    private workshopsRepository: WorkshopsRepository,
    private eventsRepository: EventsRepository,
  ) {}

  async execute({
    name,
    description,
    eventId,
  }: CreateWorkshopUseCaseRequest): Promise<CreateWorkshopUseCaseResponse> {
    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      return left(new ResourceNotFoundError())
    }

    const workshop = Workshop.create({
      name,
      description,
      eventId: new UniqueEntityID(eventId),
    })

    await this.workshopsRepository.create(workshop)

    return right({ workshop })
  }
}
