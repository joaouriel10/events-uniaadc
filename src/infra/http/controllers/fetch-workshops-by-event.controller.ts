import { FetchWorkshopsByEventUseCase } from '@/domain/event/application/use-cases/fetch-workshops-by-event'
import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { WorkshopPresenter } from '../presenters/workshop-presenter'

@Controller('/events/:eventId/workshops')
export class FetchWorkshopsByEventController {
  constructor(private fetchWorkshopsByEvent: FetchWorkshopsByEventUseCase) {}

  @Get()
  async handle(@Param('eventId') eventId: string) {
    const result = await this.fetchWorkshopsByEvent.execute({ eventId })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { workshops } = result.value

    return { workshops: workshops.map(WorkshopPresenter.toHTTP) }
  }
}
