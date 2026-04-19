import { FetchCongregationsUseCase } from '@/domain/event/application/use-cases/fetch-congregations'
import { BadRequestException, Controller, Get } from '@nestjs/common'
import { CongregationPresenter } from '../presenters/congregation-presenter'

@Controller('/congregations')
export class FetchCongregationsController {
  constructor(private fetchCongregations: FetchCongregationsUseCase) {}

  @Get()
  async handle() {
    const result = await this.fetchCongregations.execute()

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { congregations } = result.value

    return { congregations: congregations.map(CongregationPresenter.toHTTP) }
  }
}
