import { Injectable, Logger } from '@nestjs/common'

import {
  MailSender,
  SendMailRequest,
} from '@/domain/event/application/mail/mail-sender'
import { EnvService } from '@/infra/env/env.service'

import sgMail from '@sendgrid/mail'

@Injectable()
export class SendGridMailSender implements MailSender {
  private readonly logger = new Logger(SendGridMailSender.name)

  constructor(private envService: EnvService) {
    sgMail.setApiKey(this.envService.get('SENDGRID_API_KEY'))
  }

  async send({ to, subject, html }: SendMailRequest): Promise<void> {
    const from = this.envService.get('MAIL_FROM')

    await sgMail.send({ to, from, subject, html })

    this.logger.log(`Email sent via SendGrid to ${to}`)
  }
}
