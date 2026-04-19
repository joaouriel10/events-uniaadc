import { UseCaseError } from '@/core/errors/use-case-error'

export class EventFullError extends Error implements UseCaseError {
  constructor() {
    super('Event is full')
  }
}
