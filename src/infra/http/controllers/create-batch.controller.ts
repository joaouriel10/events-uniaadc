import { CreateBatchUseCase } from '@/domain/event/application/use-cases/create-batch'
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

const createBatchBodySchema = z.object({
  name: z.string(),
  price: z.number().nonnegative(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
})

const bodyValidationPipe = new ZodValidationPipe(createBatchBodySchema)

type CreateBatchBody = z.infer<typeof createBatchBodySchema>

@Controller('/events/:eventId/batches')
export class CreateBatchController {
  constructor(private createBatch: CreateBatchUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Param('eventId') eventId: string,
    @Body(bodyValidationPipe) body: CreateBatchBody,
  ) {
    const { name, price, startDate, endDate } = body

    const result = await this.createBatch.execute({
      name,
      price,
      startDate,
      endDate,
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
