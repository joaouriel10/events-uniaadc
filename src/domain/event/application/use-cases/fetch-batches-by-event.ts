import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { Batch } from '@/domain/event/enterprise/entities/batch'
import { BatchesRepository } from '../repositories/batches-repository'

interface FetchBatchesByEventUseCaseRequest {
  eventId: string
}

type FetchBatchesByEventUseCaseResponse = Either<
  null,
  {
    batches: Batch[]
  }
>

@Injectable()
export class FetchBatchesByEventUseCase {
  constructor(private batchesRepository: BatchesRepository) {}

  async execute({
    eventId,
  }: FetchBatchesByEventUseCaseRequest): Promise<FetchBatchesByEventUseCaseResponse> {
    const batches = await this.batchesRepository.findManyByEventId(eventId)

    return right({ batches })
  }
}
