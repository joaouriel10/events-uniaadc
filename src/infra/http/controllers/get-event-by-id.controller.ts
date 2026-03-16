import { GetEventByIdUseCase } from '@/domain/event/application/use-cases/get-event-by-id'
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { EventPresenter } from '../presenters/event-presenter'

@Controller('/events/:id')
export class GetEventByIdController {
  constructor(private getEventById: GetEventByIdUseCase) {}

  @Get()
  async handle(@Param('id') id: string) {
    const result = await this.getEventById.execute({ eventId: id })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return { event: EventPresenter.toHTTP(result.value.event) }
  }
}
