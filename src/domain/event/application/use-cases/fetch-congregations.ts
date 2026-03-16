import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { Congregation } from '@/domain/event/enterprise/entities/congregation'
import { CongregationsRepository } from '../repositories/congregations-repository'

type FetchCongregationsUseCaseResponse = Either<
  null,
  {
    congregations: Congregation[]
  }
>

@Injectable()
export class FetchCongregationsUseCase {
  constructor(private congregationsRepository: CongregationsRepository) {}

  async execute(): Promise<FetchCongregationsUseCaseResponse> {
    const congregations = await this.congregationsRepository.findMany()

    return right({ congregations })
  }
}
