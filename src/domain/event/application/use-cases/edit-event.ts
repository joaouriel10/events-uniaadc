import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Event } from '@/domain/event/enterprise/entities/event'
import { EventsRepository } from '../repositories/events-repository'

interface EditEventUseCaseRequest {
  eventId: string
  name: string
  description: string
  date: Date
  location: string
  maxParticipants: number
  isActive: boolean
}

type EditEventUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    event: Event
  }
>

@Injectable()
export class EditEventUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    eventId,
    name,
    description,
    date,
    location,
    maxParticipants,
    isActive,
  }: EditEventUseCaseRequest): Promise<EditEventUseCaseResponse> {
    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      return left(new ResourceNotFoundError())
    }

    event.name = name
    event.description = description
    event.date = date
    event.location = location
    event.maxParticipants = maxParticipants
    event.isActive = isActive

    await this.eventsRepository.save(event)

    return right({ event })
  }
}
