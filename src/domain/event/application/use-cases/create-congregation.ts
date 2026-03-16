import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Congregation } from '@/domain/event/enterprise/entities/congregation'
import { CongregationsRepository } from '../repositories/congregations-repository'
import { RegionalsRepository } from '../repositories/regionals-repository'

interface CreateCongregationUseCaseRequest {
  name: string
  regionalId: string
}

type CreateCongregationUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    congregation: Congregation
  }
>

@Injectable()
export class CreateCongregationUseCase {
  constructor(
    private congregationsRepository: CongregationsRepository,
    private regionalsRepository: RegionalsRepository,
  ) {}

  async execute({
    name,
    regionalId,
  }: CreateCongregationUseCaseRequest): Promise<CreateCongregationUseCaseResponse> {
    const regional = await this.regionalsRepository.findById(regionalId)

    if (!regional) {
      return left(new ResourceNotFoundError())
    }

    const congregation = Congregation.create({
      name,
      regionalId: new UniqueEntityID(regionalId),
    })

    await this.congregationsRepository.create(congregation)

    return right({ congregation })
  }
}
