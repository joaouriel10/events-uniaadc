import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { Congregation } from '@/domain/event/enterprise/entities/congregation'
import { CongregationsRepository } from '../repositories/congregations-repository'

interface FetchCongregationsByRegionalUseCaseRequest {
  regionalId: string
}

type FetchCongregationsByRegionalUseCaseResponse = Either<
  null,
  {
    congregations: Congregation[]
  }
>

@Injectable()
export class FetchCongregationsByRegionalUseCase {
  constructor(private congregationsRepository: CongregationsRepository) {}

  async execute({
    regionalId,
  }: FetchCongregationsByRegionalUseCaseRequest): Promise<FetchCongregationsByRegionalUseCaseResponse> {
    const congregations =
      await this.congregationsRepository.findManyByRegionalId(regionalId)

    return right({ congregations })
  }
}
