import { UseCaseError } from '@/core/errors/use-case-error'

export class BatchNotActiveError extends Error implements UseCaseError {
  constructor() {
    super('Batch is not within its active period')
  }
}
