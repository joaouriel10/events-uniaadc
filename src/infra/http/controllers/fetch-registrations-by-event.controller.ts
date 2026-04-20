import { FetchRegistrationsByEventUseCase } from '@/domain/event/application/use-cases/fetch-registrations-by-event'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { z } from 'zod'
import { RegistrationPresenter } from '../presenters/registration-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/events/:eventId/registrations')
export class FetchRegistrationsByEventController {
  constructor(
    private fetchRegistrationsByEvent: FetchRegistrationsByEventUseCase,
  ) {}

  @Get()
  async handle(
    @Param('eventId') eventId: string,
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
  ) {
    const result = await this.fetchRegistrationsByEvent.execute({
      eventId,
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { registrations } = result.value

    return { registrations: registrations.map(RegistrationPresenter.toHTTP) }
  }
}
