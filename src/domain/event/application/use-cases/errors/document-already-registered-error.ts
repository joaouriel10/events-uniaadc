import { UseCaseError } from '@/core/errors/use-case-error'

export class DocumentAlreadyRegisteredError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Document already registered for this event')
  }
}
