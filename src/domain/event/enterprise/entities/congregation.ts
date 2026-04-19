import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface CongregationProps {
  name: string
  regionalId: UniqueEntityID
  createdAt: Date
}

export class Congregation extends Entity<CongregationProps> {
  get name() {
    return this.props.name
  }

  get regionalId() {
    return this.props.regionalId
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<CongregationProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const congregation = new Congregation(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return congregation
  }
}
