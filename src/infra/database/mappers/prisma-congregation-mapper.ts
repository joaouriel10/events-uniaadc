import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Congregation } from '@/domain/event/enterprise/entities/congregation'
import { Prisma, Congregation as PrismaCongregation } from '@prisma/client'

export class PrismaCongregationMapper {
  static toDomain(raw: PrismaCongregation): Congregation {
    return Congregation.create(
      {
        name: raw.name,
        regionalId: new UniqueEntityID(raw.regionalId),
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    congregation: Congregation,
  ): Prisma.CongregationUncheckedCreateInput {
    return {
      id: congregation.id.toString(),
      name: congregation.name,
      regionalId: congregation.regionalId.toString(),
      createdAt: congregation.createdAt,
    }
  }
}
