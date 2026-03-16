import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Registration } from '@/domain/event/enterprise/entities/registration'
import { Prisma, Registration as PrismaRegistration } from '@prisma/client'

export class PrismaRegistrationMapper {
  static toDomain(raw: PrismaRegistration): Registration {
    return Registration.create(
      {
        name: raw.name,
        cpf: raw.cpf,
        phone: raw.phone,
        email: raw.email,
        extraLunch: raw.extraLunch,
        eventId: new UniqueEntityID(raw.eventId),
        regionalId: new UniqueEntityID(raw.regionalId),
        congregationId: new UniqueEntityID(raw.congregationId),
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    registration: Registration,
  ): Prisma.RegistrationUncheckedCreateInput {
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
