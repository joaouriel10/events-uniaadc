import { Injectable } from '@nestjs/common'

import { WorkshopsRepository } from '@/domain/event/application/repositories/workshops-repository'
import { Workshop } from '@/domain/event/enterprise/entities/workshop'
import { PrismaWorkshopMapper } from '../../mappers/prisma-workshop-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaWorkshopsRepository implements WorkshopsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Workshop | null> {
    const workshop = await this.prisma.workshop.findUnique({
      where: { id },
    })

    if (!workshop) {
      return null
    }

    return PrismaWorkshopMapper.toDomain(workshop)
  }

  async findManyByEventId(eventId: string): Promise<Workshop[]> {
    const workshops = await this.prisma.workshop.findMany({
      where: { eventId },
      orderBy: { name: 'asc' },
    })

    return workshops.map(PrismaWorkshopMapper.toDomain)
  }

  async findManyByIds(ids: string[]): Promise<Workshop[]> {
    const workshops = await this.prisma.workshop.findMany({
      where: { id: { in: ids } },
    })

    return workshops.map(PrismaWorkshopMapper.toDomain)
  }

  async create(workshop: Workshop): Promise<void> {
    await this.prisma.workshop.create({
      data: PrismaWorkshopMapper.toPrisma(workshop),
    })
  }

  async delete(workshop: Workshop): Promise<void> {
    await this.prisma.workshop.delete({
      where: { id: workshop.id.toString() },
    })
  }
}
