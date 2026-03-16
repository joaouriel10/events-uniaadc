import { EventsRepository } from '@/domain/event/application/repositories/events-repository'
import { RegistrationsRepository } from '@/domain/event/application/repositories/registrations-repository'
import { RegionalsRepository } from '@/domain/event/application/repositories/regionals-repository'
import { CongregationsRepository } from '@/domain/event/application/repositories/congregations-repository'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaEventsRepository } from './prisma/repositories/prisma-events-repository'
import { PrismaRegistrationsRepository } from './prisma/repositories/prisma-registrations-repository'
import { PrismaRegionalsRepository } from './prisma/repositories/prisma-regionals-repository'
import { PrismaCongregationsRepository } from './prisma/repositories/prisma-congregations-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: EventsRepository,
      useClass: PrismaEventsRepository,
    },
    {
      provide: RegistrationsRepository,
      useClass: PrismaRegistrationsRepository,
    },
    {
      provide: RegionalsRepository,
      useClass: PrismaRegionalsRepository,
    },
    {
      provide: CongregationsRepository,
      useClass: PrismaCongregationsRepository,
    },
  ],
  exports: [
    PrismaService,
    EventsRepository,
    RegistrationsRepository,
    RegionalsRepository,
    CongregationsRepository,
  ],
})
export class DatabaseModule {}
