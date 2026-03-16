import { FetchEventsUseCase } from '@/domain/event/application/use-cases/fetch-events'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { EventPresenter } from '../presenters/event-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/events')
export class FetchEventsController {
  constructor(private fetchEvents: FetchEventsUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchEvents.execute({ page })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { events } = result.value

    return { events: events.map(EventPresenter.toHTTP) }
  }
}
