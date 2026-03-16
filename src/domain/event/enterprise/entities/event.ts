import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface EventProps {
  name: string
  description: string
  date: Date
  location: string
  maxParticipants: number
  isActive: boolean
  createdAt: Date
  updatedAt?: Date | null
}

export class Event extends AggregateRoot<EventProps> {
  get name() {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
    this.touch()
  }

  get description() {
    return this.props.description
  }

  set description(value: string) {
    this.props.description = value
    this.touch()
  }

  get date() {
    return this.props.date
  }

  set date(value: Date) {
    this.props.date = value
    this.touch()
  }

  get location() {
    return this.props.location
  }

  set location(value: string) {
    this.props.location = value
    this.touch()
  }

  get maxParticipants() {
    return this.props.maxParticipants
  }

  set maxParticipants(value: number) {
    this.props.maxParticipants = value
    this.touch()
  }

  get isActive() {
    return this.props.isActive
  }

  set isActive(value: boolean) {
    this.props.isActive = value
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<EventProps, 'createdAt' | 'isActive' | 'updatedAt'>,
    id?: UniqueEntityID,
  ) {
    const event = new Event(
      {
        ...props,
        isActive: props.isActive ?? true,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return event
  }
}
