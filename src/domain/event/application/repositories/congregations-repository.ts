import { Congregation } from '@/domain/event/enterprise/entities/congregation'

export abstract class CongregationsRepository {
  abstract findById(id: string): Promise<Congregation | null>
  abstract findMany(): Promise<Congregation[]>
  abstract findManyByRegionalId(regionalId: string): Promise<Congregation[]>
  abstract create(congregation: Congregation): Promise<void>
}
