import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface RegionalProps {
  name: string
  createdAt: Date
}

export class Regional extends Entity<RegionalProps> {
  get name() {
    return this.props.name
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<RegionalProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const regional = new Regional(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return regional
  }
}
