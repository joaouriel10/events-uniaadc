import { Regional } from '@/domain/event/enterprise/entities/regional'

export abstract class RegionalsRepository {
  abstract findById(id: string): Promise<Regional | null>
  abstract findMany(): Promise<Regional[]>
  abstract create(regional: Regional): Promise<void>
}
