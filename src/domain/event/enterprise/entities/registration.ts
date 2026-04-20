import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface RegistrationProps {
  name: string
  document: string
  phone: string
  email: string
  regional: string
  congregation: string
  bringsChildren: boolean
  eventId: UniqueEntityID
  batchId: UniqueEntityID
  workshopIds: UniqueEntityID[]
  createdAt: Date
}

export class Registration extends Entity<RegistrationProps> {
  get name() {
    return this.props.name
  }

  get document() {
    return this.props.document
  }

  get phone() {
    return this.props.phone
  }

  get email() {
    return this.props.email
  }

  get regional() {
    return this.props.regional
  }

  get congregation() {
    return this.props.congregation
  }

  get bringsChildren() {
    return this.props.bringsChildren
  }

  get eventId() {
    return this.props.eventId
  }

  get batchId() {
    return this.props.batchId
  }

  get workshopIds() {
    return this.props.workshopIds
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<
      RegistrationProps,
      'createdAt' | 'bringsChildren' | 'workshopIds'
    >,
    id?: UniqueEntityID,
  ) {
    const registration = new Registration(
      {
        ...props,
        bringsChildren: props.bringsChildren ?? false,
        workshopIds: props.workshopIds ?? [],
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return registration
  }
}
