import { Injectable } from '@nestjs/common'

import { PaginationParams } from '@/core/repositories/pagination-params'
import { EventsRepository } from '@/domain/event/application/repositories/events-repository'
import { Event } from '@/domain/event/enterprise/entities/event'
import { PrismaEventMapper } from '../../mappers/prisma-event-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaEventsRepository implements EventsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Event | null> {
    const event = await this.prisma.event.findUnique({
      where: { id },
    })

    if (!event) {
      return null
    }

    return PrismaEventMapper.toDomain(event)
  }

  async findMany({ page }: PaginationParams): Promise<Event[]> {
    const events = await this.prisma.event.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return events.map(PrismaEventMapper.toDomain)
  }

  async create(event: Event): Promise<void> {
    await this.prisma.event.create({
      data: PrismaEventMapper.toPrisma(event),
    })
  }

  async save(event: Event): Promise<void> {
    await this.prisma.event.update({
      where: { id: event.id.toString() },
      data: PrismaEventMapper.toPrisma(event),
    })
  }

  async delete(event: Event): Promise<void> {
    await this.prisma.event.delete({
      where: { id: event.id.toString() },
    })
  }
}
