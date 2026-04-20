import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface BatchProps {
  name: string
  price: number
  startDate: Date
  endDate: Date
  eventId: UniqueEntityID
  createdAt: Date
}

export class Batch extends Entity<BatchProps> {
  get name() {
    return this.props.name
  }

  get price() {
    return this.props.price
  }

  get startDate() {
    return this.props.startDate
  }

  get endDate() {
    return this.props.endDate
  }

  get eventId() {
    return this.props.eventId
  }

  get createdAt() {
    return this.props.createdAt
  }

  isActive(now: Date = new Date()): boolean {
    return now >= this.props.startDate && now <= this.props.endDate
  }

  static create(
    props: Optional<BatchProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const batch = new Batch(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return batch
  }
}
