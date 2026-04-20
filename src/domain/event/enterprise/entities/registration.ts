import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface RegistrationProps {
  name: string
  document: string
  phone: string
  email: string
  bringsChildren: boolean
  pixPayload: string
  pixQrCode: string
  eventId: UniqueEntityID
  batchId: UniqueEntityID
  regionalId: UniqueEntityID
  congregationId: UniqueEntityID
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

  get bringsChildren() {
    return this.props.bringsChildren
  }

  get pixPayload() {
    return this.props.pixPayload
  }

  get pixQrCode() {
    return this.props.pixQrCode
  }

  get eventId() {
    return this.props.eventId
  }

  get batchId() {
    return this.props.batchId
  }

  get regionalId() {
    return this.props.regionalId
  }

  get congregationId() {
    return this.props.congregationId
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
      | 'createdAt'
      | 'bringsChildren'
      | 'workshopIds'
      | 'pixPayload'
      | 'pixQrCode'
    >,
    id?: UniqueEntityID,
  ) {
    const registration = new Registration(
      {
        ...props,
        bringsChildren: props.bringsChildren ?? false,
        workshopIds: props.workshopIds ?? [],
        pixPayload: props.pixPayload ?? '',
        pixQrCode: props.pixQrCode ?? '',
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return registration
  }
}
