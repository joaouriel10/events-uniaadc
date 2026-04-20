import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Registration } from '@/domain/event/enterprise/entities/registration'
import {
  Prisma,
  Registration as PrismaRegistration,
  RegistrationWorkshop as PrismaRegistrationWorkshop,
} from '@prisma/client'

type PrismaRegistrationWithWorkshops = PrismaRegistration & {
  workshops?: PrismaRegistrationWorkshop[]
}

export class PrismaRegistrationMapper {
  static toDomain(raw: PrismaRegistrationWithWorkshops): Registration {
    return Registration.create(
      {
        name: raw.name,
        document: raw.document,
        phone: raw.phone,
        email: raw.email,
        regional: raw.regional,
        congregation: raw.congregation,
        bringsChildren: raw.bringsChildren,
        eventId: new UniqueEntityID(raw.eventId),
        batchId: new UniqueEntityID(raw.batchId),
        workshopIds: (raw.workshops ?? []).map(
          (w) => new UniqueEntityID(w.workshopId),
        ),
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
      document: registration.document,
      phone: registration.phone,
      email: registration.email,
      regional: registration.regional,
      congregation: registration.congregation,
      bringsChildren: registration.bringsChildren,
      eventId: registration.eventId.toString(),
      batchId: registration.batchId.toString(),
      createdAt: registration.createdAt,
    }
  }
}
