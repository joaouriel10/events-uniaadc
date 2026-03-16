import { CreateCongregationUseCase } from '@/domain/event/application/use-cases/create-congregation'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
} from '@nestjs/common'
import { z } from 'zod'

const createCongregationBodySchema = z.object({
  name: z.string(),
  regionalId: z.string().uuid(),
})

const bodyValidationPipe = new ZodValidationPipe(createCongregationBodySchema)

type CreateCongregationBody = z.infer<typeof createCongregationBodySchema>

@Controller('/congregations')
export class CreateCongregationController {
  constructor(private createCongregation: CreateCongregationUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateCongregationBody) {
    const { name, regionalId } = body

    const result = await this.createCongregation.execute({ name, regionalId })

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
