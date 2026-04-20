import { EventsRepository } from '@/domain/event/application/repositories/events-repository'
import { RegistrationsRepository } from '@/domain/event/application/repositories/registrations-repository'
import { BatchesRepository } from '@/domain/event/application/repositories/batches-repository'
import { WorkshopsRepository } from '@/domain/event/application/repositories/workshops-repository'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaEventsRepository } from './prisma/repositories/prisma-events-repository'
import { PrismaRegistrationsRepository } from './prisma/repositories/prisma-registrations-repository'
import { PrismaBatchesRepository } from './prisma/repositories/prisma-batches-repository'
import { PrismaWorkshopsRepository } from './prisma/repositories/prisma-workshops-repository'

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
  ],
  exports: [
    PrismaService,
    EventsRepository,
    RegistrationsRepository,
    BatchesRepository,
    WorkshopsRepository,
  ],
})
export class DatabaseModule {}
