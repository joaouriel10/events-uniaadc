import { EventsRepository } from '@/domain/event/application/repositories/events-repository'
import { RegistrationsRepository } from '@/domain/event/application/repositories/registrations-repository'
import { BatchesRepository } from '@/domain/event/application/repositories/batches-repository'
import { WorkshopsRepository } from '@/domain/event/application/repositories/workshops-repository'
import { RegionalsRepository } from '@/domain/event/application/repositories/regionals-repository'
import { CongregationsRepository } from '@/domain/event/application/repositories/congregations-repository'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaEventsRepository } from './prisma/repositories/prisma-events-repository'
import { PrismaRegistrationsRepository } from './prisma/repositories/prisma-registrations-repository'
import { PrismaBatchesRepository } from './prisma/repositories/prisma-batches-repository'
import { PrismaWorkshopsRepository } from './prisma/repositories/prisma-workshops-repository'
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
      provide: BatchesRepository,
      useClass: PrismaBatchesRepository,
    },
    {
      provide: WorkshopsRepository,
      useClass: PrismaWorkshopsRepository,
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
    BatchesRepository,
    WorkshopsRepository,
    RegionalsRepository,
    CongregationsRepository,
  ],
})
export class DatabaseModule {}
