import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { Event } from '@/domain/event/enterprise/entities/event'
import { EventsRepository } from '../repositories/events-repository'

interface CreateEventUseCaseRequest {
  name: string
  description: string
  date: Date
  location: string
  maxParticipants: number
}

type CreateEventUseCaseResponse = Either<
  null,
  {
    event: Event
  }
>

@Injectable()
export class CreateEventUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    name,
    description,
    date,
    location,
    maxParticipants,
  }: CreateEventUseCaseRequest): Promise<CreateEventUseCaseResponse> {
    const event = Event.create({
      name,
      description,
      date,
      location,
      maxParticipants,
    })

    await this.eventsRepository.create(event)

    return right({ event })
  }
}
