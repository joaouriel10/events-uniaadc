import { Batch } from '@/domain/event/enterprise/entities/batch'

export class BatchPresenter {
  static toHTTP(batch: Batch) {
    return {
      id: batch.id.toString(),
      name: batch.name,
      price: batch.price,
      startDate: batch.startDate,
      endDate: batch.endDate,
      eventId: batch.eventId.toString(),
      createdAt: batch.createdAt,
    }
  }
}
