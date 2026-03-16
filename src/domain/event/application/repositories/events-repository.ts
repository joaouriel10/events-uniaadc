import { PaginationParams } from '@/core/repositories/pagination-params'
import { Event } from '@/domain/event/enterprise/entities/event'

export abstract class EventsRepository {
  abstract findById(id: string): Promise<Event | null>
  abstract findMany(params: PaginationParams): Promise<Event[]>
  abstract create(event: Event): Promise<void>
  abstract save(event: Event): Promise<void>
  abstract delete(event: Event): Promise<void>
}
