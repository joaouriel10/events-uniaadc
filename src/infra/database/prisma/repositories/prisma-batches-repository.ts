import { Injectable } from '@nestjs/common'

import { BatchesRepository } from '@/domain/event/application/repositories/batches-repository'
import { Batch } from '@/domain/event/enterprise/entities/batch'
import { PrismaBatchMapper } from '../../mappers/prisma-batch-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaBatchesRepository implements BatchesRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Batch | null> {
    const batch = await this.prisma.batch.findUnique({
      where: { id },
    })

    if (!batch) {
      return null
    }

    return PrismaBatchMapper.toDomain(batch)
  }

  async findManyByEventId(eventId: string): Promise<Batch[]> {
    const batches = await this.prisma.batch.findMany({
      where: { eventId },
      orderBy: { startDate: 'asc' },
    })

    return batches.map(PrismaBatchMapper.toDomain)
  }

  async create(batch: Batch): Promise<void> {
    await this.prisma.batch.create({
      data: PrismaBatchMapper.toPrisma(batch),
    })
  }

  async delete(batch: Batch): Promise<void> {
    await this.prisma.batch.delete({
      where: { id: batch.id.toString() },
    })
  }
}
