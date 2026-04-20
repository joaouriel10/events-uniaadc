export interface SendMailRequest {
  to: string
  subject: string
  html: string
}

export abstract class MailSender {
  abstract send(request: SendMailRequest): Promise<void>
}
