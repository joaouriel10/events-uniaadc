import { UseCaseError } from '@/core/errors/use-case-error'

export class WorkshopNotInEventError extends Error implements UseCaseError {
  constructor() {
    super('One or more workshops do not belong to this event')
  }
}
