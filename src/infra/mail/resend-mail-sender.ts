import { Injectable, Logger } from '@nestjs/common'

import {
  MailSender,
  SendMailRequest,
} from '@/domain/event/application/mail/mail-sender'
import { EnvService } from '@/infra/env/env.service'

import { Resend } from 'resend'

@Injectable()
export class ResendMailSender implements MailSender {
  private readonly logger = new Logger(ResendMailSender.name)
  private readonly resend: Resend

  constructor(private envService: EnvService) {
    this.resend = new Resend(this.envService.get('RESEND_API_KEY'))
  }

  async send({ to, subject, html }: SendMailRequest): Promise<void> {
    const from = this.envService.get('MAIL_FROM')

    await this.resend.emails.send({ from, to, subject, html })

    this.logger.log(`Email sent via Resend to ${to}`)
  }
}
