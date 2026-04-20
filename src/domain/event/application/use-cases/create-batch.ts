import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Batch } from '@/domain/event/enterprise/entities/batch'
import { BatchesRepository } from '../repositories/batches-repository'
import { EventsRepository } from '../repositories/events-repository'

interface CreateBatchUseCaseRequest {
  name: string
  price: number
  startDate: Date
  endDate: Date
  eventId: string
}

type CreateBatchUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    batch: Batch
  }
>

@Injectable()
export class CreateBatchUseCase {
  constructor(
    private batchesRepository: BatchesRepository,
    private eventsRepository: EventsRepository,
  ) {}

  async execute({
    name,
    price,
    startDate,
    endDate,
    eventId,
  }: CreateBatchUseCaseRequest): Promise<CreateBatchUseCaseResponse> {
    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      return left(new ResourceNotFoundError())
    }

    const batch = Batch.create({
      name,
      price,
      startDate,
      endDate,
      eventId: new UniqueEntityID(eventId),
    })

    await this.batchesRepository.create(batch)

    return right({ batch })
  }
}
