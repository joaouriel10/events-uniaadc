import { CreateWorkshopUseCase } from '@/domain/event/application/use-cases/create-workshop'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common'
import { z } from 'zod'

const createWorkshopBodySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(createWorkshopBodySchema)

type CreateWorkshopBody = z.infer<typeof createWorkshopBodySchema>

@Controller('/events/:eventId/workshops')
export class CreateWorkshopController {
  constructor(private createWorkshop: CreateWorkshopUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Param('eventId') eventId: string,
    @Body(bodyValidationPipe) body: CreateWorkshopBody,
  ) {
    const { name, description } = body

    const result = await this.createWorkshop.execute({
      name,
      description,
      eventId,
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
