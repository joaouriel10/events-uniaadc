import { Registration } from '@/domain/event/enterprise/entities/registration'

export class RegistrationPresenter {
  static toHTTP(registration: Registration) {
    return {
      id: registration.id.toString(),
      name: registration.name,
      cpf: registration.cpf,
      phone: registration.phone,
      email: registration.email,
      extraLunch: registration.extraLunch,
      eventId: registration.eventId.toString(),
      regionalId: registration.regionalId.toString(),
      congregationId: registration.congregationId.toString(),
      createdAt: registration.createdAt,
    }
  }
}
