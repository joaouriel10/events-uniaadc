import { DeleteEventUseCase } from '@/domain/event/application/use-cases/delete-event'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'

@Controller('/events/:id')
export class DeleteEventController {
  constructor(private deleteEvent: DeleteEventUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') id: string) {
    const result = await this.deleteEvent.execute({ eventId: id })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
