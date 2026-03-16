import { Event } from '@/domain/event/enterprise/entities/event'

export class EventPresenter {
  static toHTTP(event: Event) {
    return {
      id: event.id.toString(),
      name: event.name,
      description: event.description,
      date: event.date,
      location: event.location,
      maxParticipants: event.maxParticipants,
      isActive: event.isActive,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    }
  }
}
