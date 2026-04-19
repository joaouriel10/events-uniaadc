import { UseCaseError } from '@/core/errors/use-case-error'

export class EventNotActiveError extends Error implements UseCaseError {
  constructor() {
    super('Event is not active')
  }
}
