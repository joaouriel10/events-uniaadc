import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { WorkshopsRepository } from '../repositories/workshops-repository'

interface DeleteWorkshopUseCaseRequest {
  workshopId: string
}

type DeleteWorkshopUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteWorkshopUseCase {
  constructor(private workshopsRepository: WorkshopsRepository) {}

  async execute({
    workshopId,
  }: DeleteWorkshopUseCaseRequest): Promise<DeleteWorkshopUseCaseResponse> {
    const workshop = await this.workshopsRepository.findById(workshopId)

    if (!workshop) {
      return left(new ResourceNotFoundError())
    }

    await this.workshopsRepository.delete(workshop)

    return right(null)
  }
}
