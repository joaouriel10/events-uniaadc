import { Injectable } from '@nestjs/common'

import { RegionalsRepository } from '@/domain/event/application/repositories/regionals-repository'
import { Regional } from '@/domain/event/enterprise/entities/regional'
import { PrismaRegionalMapper } from '../../mappers/prisma-regional-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaRegionalsRepository implements RegionalsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Regional | null> {
    const regional = await this.prisma.regional.findUnique({
      where: { id },
    })

    if (!regional) {
      return null
    }

    return PrismaRegionalMapper.toDomain(regional)
  }

  async findMany(): Promise<Regional[]> {
    const regionals = await this.prisma.regional.findMany({
      orderBy: { name: 'asc' },
    })

    return regionals.map(PrismaRegionalMapper.toDomain)
  }

  async create(regional: Regional): Promise<void> {
    await this.prisma.regional.create({
      data: PrismaRegionalMapper.toPrisma(regional),
    })
  }
}
