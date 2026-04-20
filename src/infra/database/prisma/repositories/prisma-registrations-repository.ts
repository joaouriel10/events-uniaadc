import { Injectable } from '@nestjs/common'

import { PaginationParams } from '@/core/repositories/pagination-params'
import { RegistrationsRepository } from '@/domain/event/application/repositories/registrations-repository'
import { Registration } from '@/domain/event/enterprise/entities/registration'
import { PrismaRegistrationMapper } from '../../mappers/prisma-registration-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaRegistrationsRepository implements RegistrationsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Registration | null> {
    const registration = await this.prisma.registration.findUnique({
      where: { id },
      include: { workshops: true },
    })

    if (!registration) {
      return null
    }

    return PrismaRegistrationMapper.toDomain(registration)
  }

  async findByDocumentAndEventId(
    document: string,
    eventId: string,
  ): Promise<Registration | null> {
    const registration = await this.prisma.registration.findFirst({
      where: { document, eventId },
      include: { workshops: true },
    })

    if (!registration) {
      return null
    }

    return PrismaRegistrationMapper.toDomain(registration)
  }

  async findManyByEventId(
    eventId: string,
    { page }: PaginationParams,
  ): Promise<Registration[]> {
    const registrations = await this.prisma.registration.findMany({
      where: { eventId },
      include: { workshops: true },
      orderBy: { createdAt: 'desc' },
      take: 20,
      skip: (page - 1) * 20,
    })

    return registrations.map(PrismaRegistrationMapper.toDomain)
  }

  async countByEventId(eventId: string): Promise<number> {
    return this.prisma.registration.count({
      where: { eventId },
    })
  }

  async create(registration: Registration): Promise<void> {
    const data = PrismaRegistrationMapper.toPrisma(registration)

    await this.prisma.registration.create({
      data: {
        ...data,
        workshops: {
          create: registration.workshopIds.map((workshopId) => ({
            workshopId: workshopId.toString(),
          })),
        },
      },
    })
  }

  async delete(registration: Registration): Promise<void> {
    await this.prisma.registration.delete({
      where: { id: registration.id.toString() },
    })
  }
}
