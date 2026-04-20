import { FetchRegionalsUseCase } from '@/domain/event/application/use-cases/fetch-regionals'
import { BadRequestException, Controller, Get } from '@nestjs/common'
import { RegionalPresenter } from '../presenters/regional-presenter'

@Controller('/regionals')
export class FetchRegionalsController {
  constructor(private fetchRegionals: FetchRegionalsUseCase) {}

  @Get()
  async handle() {
    const result = await this.fetchRegionals.execute()

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { regionals } = result.value

    return { regionals: regionals.map(RegionalPresenter.toHTTP) }
  }
}
