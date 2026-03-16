import { Congregation } from '@/domain/event/enterprise/entities/congregation'

export class CongregationPresenter {
  static toHTTP(congregation: Congregation) {
    return {
      id: congregation.id.toString(),
      name: congregation.name,
      regionalId: congregation.regionalId.toString(),
      createdAt: congregation.createdAt,
    }
  }
}
