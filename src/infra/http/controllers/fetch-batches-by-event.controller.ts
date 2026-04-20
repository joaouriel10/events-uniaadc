import { FetchBatchesByEventUseCase } from '@/domain/event/application/use-cases/fetch-batches-by-event'
import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { BatchPresenter } from '../presenters/batch-presenter'

@Controller('/events/:eventId/batches')
export class FetchBatchesByEventController {
  constructor(private fetchBatchesByEvent: FetchBatchesByEventUseCase) {}

  @Get()
  async handle(@Param('eventId') eventId: string) {
    const result = await this.fetchBatchesByEvent.execute({ eventId })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { batches } = result.value

    return { batches: batches.map(BatchPresenter.toHTTP) }
  }
}
