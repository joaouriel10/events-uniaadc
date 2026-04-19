import { FetchCongregationsByRegionalUseCase } from '@/domain/event/application/use-cases/fetch-congregations-by-regional'
import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { CongregationPresenter } from '../presenters/congregation-presenter'

@Controller('/regionals/:regionalId/congregations')
export class FetchCongregationsByRegionalController {
  constructor(
    private fetchCongregationsByRegional: FetchCongregationsByRegionalUseCase,
  ) {}

  @Get()
  async handle(@Param('regionalId') regionalId: string) {
    const result = await this.fetchCongregationsByRegional.execute({
      regionalId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { congregations } = result.value

    return { congregations: congregations.map(CongregationPresenter.toHTTP) }
  }
}
