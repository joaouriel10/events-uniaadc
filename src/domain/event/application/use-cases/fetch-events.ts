import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { Event } from '@/domain/event/enterprise/entities/event'
import { EventsRepository } from '../repositories/events-repository'

interface FetchEventsUseCaseRequest {
  page: number
}

type FetchEventsUseCaseResponse = Either<
  null,
  {
    events: Event[]
  }
>

@Injectable()
export class FetchEventsUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    page,
  }: FetchEventsUseCaseRequest): Promise<FetchEventsUseCaseResponse> {
    const events = await this.eventsRepository.findMany({ page })

    return right({ events })
  }
}
