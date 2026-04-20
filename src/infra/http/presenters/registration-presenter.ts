import { Registration } from '@/domain/event/enterprise/entities/registration'

export class RegistrationPresenter {
  static toHTTP(registration: Registration) {
    return {
      id: registration.id.toString(),
      name: registration.name,
      document: registration.document,
      phone: registration.phone,
      email: registration.email,
      bringsChildren: registration.bringsChildren,
      pixPayload: registration.pixPayload,
      pixQrCode: registration.pixQrCode,
      eventId: registration.eventId.toString(),
      batchId: registration.batchId.toString(),
      regionalId: registration.regionalId.toString(),
      congregationId: registration.congregationId.toString(),
      workshopIds: registration.workshopIds.map((id) => id.toString()),
      createdAt: registration.createdAt,
    }
  }
}
