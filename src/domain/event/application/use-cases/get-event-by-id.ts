import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Event } from '@/domain/event/enterprise/entities/event'
import { EventsRepository } from '../repositories/events-repository'

interface GetEventByIdUseCaseRequest {
  eventId: string
}

type GetEventByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    event: Event
  }
>

@Injectable()
export class GetEventByIdUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    eventId,
  }: GetEventByIdUseCaseRequest): Promise<GetEventByIdUseCaseResponse> {
    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      return left(new ResourceNotFoundError())
    }

    return right({ event })
  }
}
