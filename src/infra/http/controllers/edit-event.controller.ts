import { EditEventUseCase } from '@/domain/event/application/use-cases/edit-event'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'

const editEventBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  location: z.string(),
  maxParticipants: z.number().int().positive(),
  isActive: z.boolean(),
})

const bodyValidationPipe = new ZodValidationPipe(editEventBodySchema)

type EditEventBody = z.infer<typeof editEventBodySchema>

@Controller('/events/:id')
export class EditEventController {
  constructor(private editEvent: EditEventUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('id') id: string,
    @Body(bodyValidationPipe) body: EditEventBody,
  ) {
    const { name, description, date, location, maxParticipants, isActive } =
      body

    const result = await this.editEvent.execute({
      eventId: id,
      name,
      description,
      date,
      location,
      maxParticipants,
      isActive,
    })

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
