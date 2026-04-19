import { CreateEventUseCase } from '@/domain/event/application/use-cases/create-event'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { z } from 'zod'

const createEventBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  location: z.string(),
  maxParticipants: z.number().int().positive(),
})

const bodyValidationPipe = new ZodValidationPipe(createEventBodySchema)

type CreateEventBody = z.infer<typeof createEventBodySchema>

@Controller('/events')
export class CreateEventController {
  constructor(private createEvent: CreateEventUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateEventBody) {
    const { name, description, date, location, maxParticipants } = body

    const result = await this.createEvent.execute({
      name,
      description,
      date,
      location,
      maxParticipants,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
