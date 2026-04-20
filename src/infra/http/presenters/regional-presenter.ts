import { Regional } from '@/domain/event/enterprise/entities/regional'

export class RegionalPresenter {
  static toHTTP(regional: Regional) {
    return {
      id: regional.id.toString(),
      name: regional.name,
      createdAt: regional.createdAt,
    }
  }
}
