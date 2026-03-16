import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface RegistrationProps {
  name: string
  cpf: string
  phone: string
  email: string
  extraLunch: boolean
  eventId: UniqueEntityID
  regionalId: UniqueEntityID
  congregationId: UniqueEntityID
  createdAt: Date
}

export class Registration extends Entity<RegistrationProps> {
  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
  }

  get phone() {
    return this.props.phone
  }

  get email() {
    return this.props.email
  }

  get extraLunch() {
    return this.props.extraLunch
  }

  get eventId() {
    return this.props.eventId
  }

  get regionalId() {
    return this.props.regionalId
  }

  get congregationId() {
    return this.props.congregationId
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<RegistrationProps, 'createdAt' | 'extraLunch'>,
    id?: UniqueEntityID,
  ) {
    const registration = new Registration(
      {
        ...props,
        extraLunch: props.extraLunch ?? false,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return registration
  }
}
