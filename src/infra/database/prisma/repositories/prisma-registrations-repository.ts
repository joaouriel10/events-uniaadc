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
    })

    if (!registration) {
      return null
    }

    return PrismaRegistrationMapper.toDomain(registration)
  }

  async findByCpfAndEventId(
    cpf: string,
    eventId: string,
  ): Promise<Registration | null> {
    const registration = await this.prisma.registration.findFirst({
      where: { cpf, eventId },
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
    await this.prisma.registration.create({
      data: PrismaRegistrationMapper.toPrisma(registration),
    })
  }

  async delete(registration: Registration): Promise<void> {
    await this.prisma.registration.delete({
      where: { id: registration.id.toString() },
    })
  }
}
