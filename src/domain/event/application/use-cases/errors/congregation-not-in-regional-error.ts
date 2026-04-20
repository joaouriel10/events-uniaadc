import { UseCaseError } from '@/core/errors/use-case-error'

export class CongregationNotInRegionalError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Congregation does not belong to the selected regional')
  }
}
