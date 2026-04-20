import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { Regional } from '@/domain/event/enterprise/entities/regional'
import { RegionalsRepository } from '../repositories/regionals-repository'

interface CreateRegionalUseCaseRequest {
  name: string
}

type CreateRegionalUseCaseResponse = Either<
  null,
  {
    regional: Regional
  }
>

@Injectable()
export class CreateRegionalUseCase {
  constructor(private regionalsRepository: RegionalsRepository) {}

  async execute({
    name,
  }: CreateRegionalUseCaseRequest): Promise<CreateRegionalUseCaseResponse> {
    const regional = Regional.create({ name })

    await this.regionalsRepository.create(regional)

    return right({ regional })
  }
}
