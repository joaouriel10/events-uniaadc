import { Injectable } from '@nestjs/common'

import { CongregationsRepository } from '@/domain/event/application/repositories/congregations-repository'
import { Congregation } from '@/domain/event/enterprise/entities/congregation'
import { PrismaCongregationMapper } from '../../mappers/prisma-congregation-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaCongregationsRepository implements CongregationsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Congregation | null> {
    const congregation = await this.prisma.congregation.findUnique({
      where: { id },
    })

    if (!congregation) {
      return null
    }

    return PrismaCongregationMapper.toDomain(congregation)
  }

  async findMany(): Promise<Congregation[]> {
    const congregations = await this.prisma.congregation.findMany({
      orderBy: { name: 'asc' },
    })

    return congregations.map(PrismaCongregationMapper.toDomain)
  }

  async findManyByRegionalId(regionalId: string): Promise<Congregation[]> {
    const congregations = await this.prisma.congregation.findMany({
      where: { regionalId },
      orderBy: { name: 'asc' },
    })

    return congregations.map(PrismaCongregationMapper.toDomain)
  }

  async create(congregation: Congregation): Promise<void> {
    await this.prisma.congregation.create({
      data: PrismaCongregationMapper.toPrisma(congregation),
    })
  }
}
