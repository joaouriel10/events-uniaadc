import { RegisterParticipantUseCase } from '@/domain/event/application/use-cases/register-participant'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { EventFullError } from '@/domain/event/application/use-cases/errors/event-full-error'
import { DocumentAlreadyRegisteredError } from '@/domain/event/application/use-cases/errors/document-already-registered-error'
import { EventNotActiveError } from '@/domain/event/application/use-cases/errors/event-not-active-error'
import { BatchNotActiveError } from '@/domain/event/application/use-cases/errors/batch-not-active-error'
import { WorkshopNotInEventError } from '@/domain/event/application/use-cases/errors/workshop-not-in-event-error'
import { CongregationNotInRegionalError } from '@/domain/event/application/use-cases/errors/congregation-not-in-regional-error'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { RegistrationPresenter } from '../presenters/registration-presenter'
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
  document: z.string(),
  phone: z.string(),
  email: z.string().email(),
  bringsChildren: z.boolean().default(false),
  batchId: z.string().uuid(),
  regionalId: z.string().uuid(),
  congregationId: z.string().uuid(),
  workshopIds: z.array(z.string().uuid()).default([]),
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
    const {
      name,
      document,
      phone,
      email,
      bringsChildren,
      batchId,
      regionalId,
      congregationId,
      workshopIds,
    } = body

    const result = await this.registerParticipant.execute({
      name,
      document,
      phone,
      email,
      bringsChildren,
      eventId,
      batchId,
      regionalId,
      congregationId,
      workshopIds,
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
        case DocumentAlreadyRegisteredError:
          throw new ConflictException(error.message)
        case BatchNotActiveError:
          throw new BadRequestException(error.message)
        case WorkshopNotInEventError:
          throw new BadRequestException(error.message)
        case CongregationNotInRegionalError:
          throw new BadRequestException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return {
      registration: RegistrationPresenter.toHTTP(result.value.registration),
    }
  }
}
