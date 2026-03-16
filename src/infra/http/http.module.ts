import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'

import { CreateEventUseCase } from '@/domain/event/application/use-cases/create-event'
import { FetchEventsUseCase } from '@/domain/event/application/use-cases/fetch-events'
import { GetEventByIdUseCase } from '@/domain/event/application/use-cases/get-event-by-id'
import { EditEventUseCase } from '@/domain/event/application/use-cases/edit-event'
import { DeleteEventUseCase } from '@/domain/event/application/use-cases/delete-event'
import { RegisterParticipantUseCase } from '@/domain/event/application/use-cases/register-participant'
import { FetchRegistrationsByEventUseCase } from '@/domain/event/application/use-cases/fetch-registrations-by-event'
import { CancelRegistrationUseCase } from '@/domain/event/application/use-cases/cancel-registration'
import { CreateRegionalUseCase } from '@/domain/event/application/use-cases/create-regional'
import { FetchRegionalsUseCase } from '@/domain/event/application/use-cases/fetch-regionals'
import { CreateCongregationUseCase } from '@/domain/event/application/use-cases/create-congregation'
import { FetchCongregationsUseCase } from '@/domain/event/application/use-cases/fetch-congregations'
import { FetchCongregationsByRegionalUseCase } from '@/domain/event/application/use-cases/fetch-congregations-by-regional'

import { CreateEventController } from './controllers/create-event.controller'
import { FetchEventsController } from './controllers/fetch-events.controller'
import { GetEventByIdController } from './controllers/get-event-by-id.controller'
import { EditEventController } from './controllers/edit-event.controller'
import { DeleteEventController } from './controllers/delete-event.controller'
import { RegisterParticipantController } from './controllers/register-participant.controller'
import { FetchRegistrationsByEventController } from './controllers/fetch-registrations-by-event.controller'
import { CancelRegistrationController } from './controllers/cancel-registration.controller'
import { CreateRegionalController } from './controllers/create-regional.controller'
import { FetchRegionalsController } from './controllers/fetch-regionals.controller'
import { CreateCongregationController } from './controllers/create-congregation.controller'
import { FetchCongregationsController } from './controllers/fetch-congregations.controller'
import { FetchCongregationsByRegionalController } from './controllers/fetch-congregations-by-regional.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateEventController,
    FetchEventsController,
    GetEventByIdController,
    EditEventController,
    DeleteEventController,
    RegisterParticipantController,
    FetchRegistrationsByEventController,
    CancelRegistrationController,
    CreateRegionalController,
    FetchRegionalsController,
    CreateCongregationController,
    FetchCongregationsController,
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
    CreateRegionalUseCase,
    FetchRegionalsUseCase,
    CreateCongregationUseCase,
    FetchCongregationsUseCase,
    FetchCongregationsByRegionalUseCase,
  ],
})
export class HttpModule {}
