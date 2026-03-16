import { UseCaseError } from '@/core/errors/use-case-error'

export class CpfAlreadyRegisteredError extends Error implements UseCaseError {
  constructor() {
    super('CPF already registered for this event')
  }
}
