import { DeleteBatchUseCase } from '@/domain/event/application/use-cases/delete-batch'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'

@Controller('/batches/:id')
export class DeleteBatchController {
  constructor(private deleteBatch: DeleteBatchUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') id: string) {
    const result = await this.deleteBatch.execute({ batchId: id })

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
