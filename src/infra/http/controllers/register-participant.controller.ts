import { RegisterParticipantUseCase } from '@/domain/event/application/use-cases/register-participant'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { EventFullError } from '@/domain/event/application/use-cases/errors/event-full-error'
import { CpfAlreadyRegisteredError } from '@/domain/event/application/use-cases/errors/cpf-already-registered-error'
import { CongregationNotInRegionalError } from '@/domain/event/application/use-cases/errors/congregation-not-in-regional-error'
import { EventNotActiveError } from '@/domain/event/application/use-cases/errors/event-not-active-error'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common'
import { z } from 'zod'

const registerParticipantBodySchema = z.object({
  name: z.string(),
  cpf: z.string(),
  phone: z.string(),
  email: z.string().email(),
  extraLunch: z.boolean().default(false),
  regionalId: z.string().uuid(),
  congregationId: z.string().uuid(),
})

const bodyValidationPipe = new ZodValidationPipe(registerParticipantBodySchema)

type RegisterParticipantBody = z.infer<typeof registerParticipantBodySchema>

@Controller('/events/:eventId/registrations')
export class RegisterParticipantController {
  constructor(private registerParticipant: RegisterParticipantUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Param('eventId') eventId: string,
    @Body(bodyValidationPipe) body: RegisterParticipantBody,
  ) {
    const { name, cpf, phone, email, extraLunch, regionalId, congregationId } =
      body

    const result = await this.registerParticipant.execute({
      name,
      cpf,
      phone,
      email,
      extraLunch,
      eventId,
      regionalId,
      congregationId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        case EventNotActiveError:
          throw new BadRequestException(error.message)
        case EventFullError:
          throw new BadRequestException(error.message)
        case CpfAlreadyRegisteredError:
          throw new ConflictException(error.message)
        case CongregationNotInRegionalError:
          throw new BadRequestException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
