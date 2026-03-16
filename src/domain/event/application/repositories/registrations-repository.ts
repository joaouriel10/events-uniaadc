import { PaginationParams } from '@/core/repositories/pagination-params'
import { Registration } from '@/domain/event/enterprise/entities/registration'

export abstract class RegistrationsRepository {
  abstract findById(id: string): Promise<Registration | null>
  abstract findByCpfAndEventId(
    cpf: string,
    eventId: string,
  ): Promise<Registration | null>
  abstract findManyByEventId(
    eventId: string,
    params: PaginationParams,
  ): Promise<Registration[]>
  abstract countByEventId(eventId: string): Promise<number>
  abstract create(registration: Registration): Promise<void>
  abstract delete(registration: Registration): Promise<void>
}
