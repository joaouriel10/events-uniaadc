import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { BatchesRepository } from '../repositories/batches-repository'

interface DeleteBatchUseCaseRequest {
  batchId: string
}

type DeleteBatchUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteBatchUseCase {
  constructor(private batchesRepository: BatchesRepository) {}

  async execute({
    batchId,
  }: DeleteBatchUseCaseRequest): Promise<DeleteBatchUseCaseResponse> {
    const batch = await this.batchesRepository.findById(batchId)

    if (!batch) {
      return left(new ResourceNotFoundError())
    }

    await this.batchesRepository.delete(batch)

    return right(null)
  }
}
