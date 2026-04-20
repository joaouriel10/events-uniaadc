import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { Workshop } from '@/domain/event/enterprise/entities/workshop'
import { WorkshopsRepository } from '../repositories/workshops-repository'

interface FetchWorkshopsByEventUseCaseRequest {
  eventId: string
}

type FetchWorkshopsByEventUseCaseResponse = Either<
  null,
  {
    workshops: Workshop[]
  }
>

@Injectable()
export class FetchWorkshopsByEventUseCase {
  constructor(private workshopsRepository: WorkshopsRepository) {}

  async execute({
    eventId,
  }: FetchWorkshopsByEventUseCaseRequest): Promise<FetchWorkshopsByEventUseCaseResponse> {
    const workshops = await this.workshopsRepository.findManyByEventId(eventId)

    return right({ workshops })
  }
}
