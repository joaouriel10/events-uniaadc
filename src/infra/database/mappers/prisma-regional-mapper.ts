import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Regional } from '@/domain/event/enterprise/entities/regional'
import { Prisma, Regional as PrismaRegional } from '@prisma/client'

export class PrismaRegionalMapper {
  static toDomain(raw: PrismaRegional): Regional {
    return Regional.create(
      {
        name: raw.name,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(regional: Regional): Prisma.RegionalUncheckedCreateInput {
    return {
      id: regional.id.toString(),
      name: regional.name,
      createdAt: regional.createdAt,
    }
  }
}
