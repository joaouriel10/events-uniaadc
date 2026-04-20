import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Batch } from '@/domain/event/enterprise/entities/batch'
import { Prisma, Batch as PrismaBatch } from '@prisma/client'

export class PrismaBatchMapper {
  static toDomain(raw: PrismaBatch): Batch {
    return Batch.create(
      {
        name: raw.name,
        price: raw.price,
        startDate: raw.startDate,
        endDate: raw.endDate,
        eventId: new UniqueEntityID(raw.eventId),
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(batch: Batch): Prisma.BatchUncheckedCreateInput {
    return {
      id: batch.id.toString(),
      name: batch.name,
      price: batch.price,
      startDate: batch.startDate,
      endDate: batch.endDate,
      eventId: batch.eventId.toString(),
      createdAt: batch.createdAt,
    }
  }
}
