import { Workshop } from '@/domain/event/enterprise/entities/workshop'

export class WorkshopPresenter {
  static toHTTP(workshop: Workshop) {
    return {
      id: workshop.id.toString(),
      name: workshop.name,
      description: workshop.description,
      eventId: workshop.eventId.toString(),
      createdAt: workshop.createdAt,
    }
  }
}
