import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface WorkshopProps {
  name: string
  description: string
  eventId: UniqueEntityID
  createdAt: Date
}

export class Workshop extends Entity<WorkshopProps> {
  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get eventId() {
    return this.props.eventId
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<WorkshopProps, 'createdAt' | 'description'>,
    id?: UniqueEntityID,
  ) {
    const workshop = new Workshop(
      {
        ...props,
        description: props.description ?? '',
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return workshop
  }
}
