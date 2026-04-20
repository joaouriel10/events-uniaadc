import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { Regional } from '@/domain/event/enterprise/entities/regional'
import { RegionalsRepository } from '../repositories/regionals-repository'

type FetchRegionalsUseCaseResponse = Either<
  null,
  {
    regionals: Regional[]
  }
>

@Injectable()
export class FetchRegionalsUseCase {
  constructor(private regionalsRepository: RegionalsRepository) {}

  async execute(): Promise<FetchRegionalsUseCaseResponse> {
    const regionals = await this.regionalsRepository.findMany()

    return right({ regionals })
  }
}
