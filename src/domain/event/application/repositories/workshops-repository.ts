import { Workshop } from '@/domain/event/enterprise/entities/workshop'

export abstract class WorkshopsRepository {
  abstract findById(id: string): Promise<Workshop | null>
  abstract findManyByEventId(eventId: string): Promise<Workshop[]>
  abstract findManyByIds(ids: string[]): Promise<Workshop[]>
  abstract create(workshop: Workshop): Promise<void>
  abstract delete(workshop: Workshop): Promise<void>
}
