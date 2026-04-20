import { Batch } from '@/domain/event/enterprise/entities/batch'

export abstract class BatchesRepository {
  abstract findById(id: string): Promise<Batch | null>
  abstract findManyByEventId(eventId: string): Promise<Batch[]>
  abstract create(batch: Batch): Promise<void>
  abstract delete(batch: Batch): Promise<void>
}
