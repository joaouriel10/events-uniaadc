import { CreateRegionalUseCase } from '@/domain/event/application/use-cases/create-regional'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { z } from 'zod'

const createRegionalBodySchema = z.object({
  name: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createRegionalBodySchema)

type CreateRegionalBody = z.infer<typeof createRegionalBodySchema>

@Controller('/regionals')
export class CreateRegionalController {
  constructor(private createRegional: CreateRegionalUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateRegionalBody) {
    const { name } = body

    const result = await this.createRegional.execute({ name })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
