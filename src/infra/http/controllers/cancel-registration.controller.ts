import { CancelRegistrationUseCase } from '@/domain/event/application/use-cases/cancel-registration'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'

@Controller('/registrations/:id')
export class CancelRegistrationController {
  constructor(private cancelRegistration: CancelRegistrationUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') id: string) {
    const result = await this.cancelRegistration.execute({
      registrationId: id,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
