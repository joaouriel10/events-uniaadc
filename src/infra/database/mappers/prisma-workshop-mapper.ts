import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Workshop } from '@/domain/event/enterprise/entities/workshop'
import { Prisma, Workshop as PrismaWorkshop } from '@prisma/client'

export class PrismaWorkshopMapper {
  static toDomain(raw: PrismaWorkshop): Workshop {
    return Workshop.create(
      {
        name: raw.name,
        description: raw.description,
        eventId: new UniqueEntityID(raw.eventId),
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(workshop: Workshop): Prisma.WorkshopUncheckedCreateInput {
    return {
      id: workshop.id.toString(),
      name: workshop.name,
      description: workshop.description,
      eventId: workshop.eventId.toString(),
      createdAt: workshop.createdAt,
    }
  }
}
