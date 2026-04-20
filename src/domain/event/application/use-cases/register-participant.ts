import { Injectable, Logger } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Registration } from '@/domain/event/enterprise/entities/registration'
import { EventsRepository } from '../repositories/events-repository'
import { RegistrationsRepository } from '../repositories/registrations-repository'
import { BatchesRepository } from '../repositories/batches-repository'
import { WorkshopsRepository } from '../repositories/workshops-repository'
import { CongregationsRepository } from '../repositories/congregations-repository'
import { MailSender } from '../mail/mail-sender'
import { PixGenerator } from '../pix/pix-generator'
import { EventFullError } from './errors/event-full-error'
import { DocumentAlreadyRegisteredError } from './errors/document-already-registered-error'
import { EventNotActiveError } from './errors/event-not-active-error'
import { BatchNotActiveError } from './errors/batch-not-active-error'
import { WorkshopNotInEventError } from './errors/workshop-not-in-event-error'
import { CongregationNotInRegionalError } from './errors/congregation-not-in-regional-error'

interface RegisterParticipantUseCaseRequest {
  name: string
  document: string
  phone: string
  email: string
  bringsChildren: boolean
  eventId: string
  batchId: string
  regionalId: string
  congregationId: string
  workshopIds: string[]
}

type RegisterParticipantUseCaseResponse = Either<
  | ResourceNotFoundError
  | EventNotActiveError
  | EventFullError
  | DocumentAlreadyRegisteredError
  | BatchNotActiveError
  | WorkshopNotInEventError
  | CongregationNotInRegionalError,
  {
    registration: Registration
  }
>

@Injectable()
export class RegisterParticipantUseCase {
  private readonly logger = new Logger(RegisterParticipantUseCase.name)

  constructor(
    private eventsRepository: EventsRepository,
    private registrationsRepository: RegistrationsRepository,
    private batchesRepository: BatchesRepository,
    private workshopsRepository: WorkshopsRepository,
    private congregationsRepository: CongregationsRepository,
    private mailSender: MailSender,
    private pixGenerator: PixGenerator,
  ) {}

  async execute({
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
  }: RegisterParticipantUseCaseRequest): Promise<RegisterParticipantUseCaseResponse> {
    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      return left(new ResourceNotFoundError())
    }

    if (!event.isActive) {
      return left(new EventNotActiveError())
    }

    const count = await this.registrationsRepository.countByEventId(eventId)

    if (count >= event.maxParticipants) {
      return left(new EventFullError())
    }

    const existing =
      await this.registrationsRepository.findByDocumentAndEventId(
        document,
        eventId,
      )

    if (existing) {
      return left(new DocumentAlreadyRegisteredError())
    }

    const batch = await this.batchesRepository.findById(batchId)

    if (!batch) {
      return left(new ResourceNotFoundError())
    }

    if (batch.eventId.toString() !== eventId) {
      return left(new ResourceNotFoundError())
    }

    if (!batch.isActive()) {
      return left(new BatchNotActiveError())
    }

    const congregation =
      await this.congregationsRepository.findById(congregationId)

    if (!congregation) {
      return left(new ResourceNotFoundError())
    }

    if (congregation.regionalId.toString() !== regionalId) {
      return left(new CongregationNotInRegionalError())
    }

    if (workshopIds.length > 0) {
      const workshops =
        await this.workshopsRepository.findManyByIds(workshopIds)

      if (workshops.length !== workshopIds.length) {
        return left(new WorkshopNotInEventError())
      }

      const allBelongToEvent = workshops.every(
        (w) => w.eventId.toString() === eventId,
      )

      if (!allBelongToEvent) {
        return left(new WorkshopNotInEventError())
      }
    }

    const transactionId = new UniqueEntityID().toString().slice(0, 25)

    const pix = await this.pixGenerator.generate({
      value: batch.price,
      transactionId,
    })

    const registration = Registration.create({
      name,
      document,
      phone,
      email,
      bringsChildren,
      pixPayload: pix.payload,
      pixQrCode: pix.qrCode,
      eventId: new UniqueEntityID(eventId),
      batchId: new UniqueEntityID(batchId),
      regionalId: new UniqueEntityID(regionalId),
      congregationId: new UniqueEntityID(congregationId),
      workshopIds: workshopIds.map((id) => new UniqueEntityID(id)),
    })

    await this.registrationsRepository.create(registration)

    try {
      await this.mailSender.send({
        to: email,
        subject: `Inscrição confirmada - ${event.name}`,
        html: `
          <h1>Inscrição confirmada!</h1>
          <p>Olá <strong>${name}</strong>,</p>
          <p>Sua inscrição no evento <strong>${event.name}</strong> foi realizada com sucesso.</p>
          <ul>
            <li><strong>Evento:</strong> ${event.name}</li>
            <li><strong>Data:</strong> ${event.date.toLocaleDateString('pt-BR')}</li>
            <li><strong>Local:</strong> ${event.location}</li>
            <li><strong>Lote:</strong> ${batch.name} - R$ ${batch.price.toFixed(2)}</li>
          </ul>
          <h2>Pagamento via PIX</h2>
          <p><strong>PIX Copia e Cola:</strong></p>
          <p style="word-break: break-all; background: #f5f5f5; padding: 10px; border-radius: 4px;">${pix.payload}</p>
          <p><strong>QR Code:</strong></p>
          <img src="${pix.qrCode}" alt="QR Code PIX" style="max-width: 300px;" />
          <p>Obrigado por se inscrever!</p>
        `,
      })
    } catch (error) {
      this.logger.error(
        `Failed to send registration confirmation email to ${email}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    }

    return right({ registration })
  }
}
