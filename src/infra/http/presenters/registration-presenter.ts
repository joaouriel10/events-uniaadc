import { Registration } from '@/domain/event/enterprise/entities/registration'

export class RegistrationPresenter {
  static toHTTP(registration: Registration) {
    return {
      id: registration.id.toString(),
      name: registration.name,
      document: registration.document,
      phone: registration.phone,
      email: registration.email,
      regional: registration.regional,
      congregation: registration.congregation,
      bringsChildren: registration.bringsChildren,
      eventId: registration.eventId.toString(),
      batchId: registration.batchId.toString(),
      workshopIds: registration.workshopIds.map((id) => id.toString()),
      createdAt: registration.createdAt,
    }
  }
}
