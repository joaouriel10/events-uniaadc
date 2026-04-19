import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Event } from '@/domain/event/enterprise/entities/event'
import { Prisma, Event as PrismaEvent } from '@prisma/client'

export class PrismaEventMapper {
  static toDomain(raw: PrismaEvent): Event {
    return Event.create(
      {
        name: raw.name,
        description: raw.description,
        date: raw.date,
        location: raw.location,
        maxParticipants: raw.maxParticipants,
        isActive: raw.isActive,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(event: Event): Prisma.EventUncheckedCreateInput {
    return {
      id: event.id.toString(),
      name: event.name,
      description: event.description,
      date: event.date,
      location: event.location,
      maxParticipants: event.maxParticipants,
      isActive: event.isActive,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    }
  }
}
