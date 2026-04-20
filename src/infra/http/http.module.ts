import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { MailModule } from '../mail/mail.module'
import { PixModule } from '../pix/pix.module'

import { CreateEventUseCase } from '@/domain/event/application/use-cases/create-event'
import { FetchEventsUseCase } from '@/domain/event/application/use-cases/fetch-events'
import { GetEventByIdUseCase } from '@/domain/event/application/use-cases/get-event-by-id'
import { EditEventUseCase } from '@/domain/event/application/use-cases/edit-event'
import { DeleteEventUseCase } from '@/domain/event/application/use-cases/delete-event'
import { RegisterParticipantUseCase } from '@/domain/event/application/use-cases/register-participant'
import { FetchRegistrationsByEventUseCase } from '@/domain/event/application/use-cases/fetch-registrations-by-event'
import { CancelRegistrationUseCase } from '@/domain/event/application/use-cases/cancel-registration'
import { CreateBatchUseCase } from '@/domain/event/application/use-cases/create-batch'
import { FetchBatchesByEventUseCase } from '@/domain/event/application/use-cases/fetch-batches-by-event'
import { DeleteBatchUseCase } from '@/domain/event/application/use-cases/delete-batch'
import { CreateWorkshopUseCase } from '@/domain/event/application/use-cases/create-workshop'
import { FetchWorkshopsByEventUseCase } from '@/domain/event/application/use-cases/fetch-workshops-by-event'
import { DeleteWorkshopUseCase } from '@/domain/event/application/use-cases/delete-workshop'
import { CreateRegionalUseCase } from '@/domain/event/application/use-cases/create-regional'
import { FetchRegionalsUseCase } from '@/domain/event/application/use-cases/fetch-regionals'
import { CreateCongregationUseCase } from '@/domain/event/application/use-cases/create-congregation'
import { FetchCongregationsByRegionalUseCase } from '@/domain/event/application/use-cases/fetch-congregations-by-regional'

import { CreateEventController } from './controllers/create-event.controller'
import { FetchEventsController } from './controllers/fetch-events.controller'
import { GetEventByIdController } from './controllers/get-event-by-id.controller'
import { EditEventController } from './controllers/edit-event.controller'
import { DeleteEventController } from './controllers/delete-event.controller'
import { RegisterParticipantController } from './controllers/register-participant.controller'
import { FetchRegistrationsByEventController } from './controllers/fetch-registrations-by-event.controller'
import { CancelRegistrationController } from './controllers/cancel-registration.controller'
import { CreateBatchController } from './controllers/create-batch.controller'
import { FetchBatchesByEventController } from './controllers/fetch-batches-by-event.controller'
import { DeleteBatchController } from './controllers/delete-batch.controller'
import { CreateWorkshopController } from './controllers/create-workshop.controller'
import { FetchWorkshopsByEventController } from './controllers/fetch-workshops-by-event.controller'
import { DeleteWorkshopController } from './controllers/delete-workshop.controller'
import { CreateRegionalController } from './controllers/create-regional.controller'
import { FetchRegionalsController } from './controllers/fetch-regionals.controller'
import { CreateCongregationController } from './controllers/create-congregation.controller'
import { FetchCongregationsByRegionalController } from './controllers/fetch-congregations-by-regional.controller'

@Module({
  imports: [DatabaseModule, MailModule, PixModule],
  controllers: [
    CreateEventController,
    FetchEventsController,
    GetEventByIdController,
    EditEventController,
    DeleteEventController,
    RegisterParticipantController,
    FetchRegistrationsByEventController,
    CancelRegistrationController,
    CreateBatchController,
    FetchBatchesByEventController,
    DeleteBatchController,
    CreateWorkshopController,
    FetchWorkshopsByEventController,
    DeleteWorkshopController,
    CreateRegionalController,
    FetchRegionalsController,
    CreateCongregationController,
    FetchCongregationsByRegionalController,
  ],
  providers: [
    CreateEventUseCase,
    FetchEventsUseCase,
    GetEventByIdUseCase,
    EditEventUseCase,
    DeleteEventUseCase,
    RegisterParticipantUseCase,
    FetchRegistrationsByEventUseCase,
    CancelRegistrationUseCase,
    CreateBatchUseCase,
    FetchBatchesByEventUseCase,
    DeleteBatchUseCase,
    CreateWorkshopUseCase,
    FetchWorkshopsByEventUseCase,
    DeleteWorkshopUseCase,
    CreateRegionalUseCase,
    FetchRegionalsUseCase,
    CreateCongregationUseCase,
    FetchCongregationsByRegionalUseCase,
  ],
})
export class HttpModule {}
