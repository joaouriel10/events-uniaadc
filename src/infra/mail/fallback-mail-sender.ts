import { Injectable, Logger } from '@nestjs/common'

import {
  MailSender,
  SendMailRequest,
} from '@/domain/event/application/mail/mail-sender'
import { SendGridMailSender } from './sendgrid-mail-sender'
import { ResendMailSender } from './resend-mail-sender'

@Injectable()
export class FallbackMailSender implements MailSender {
  private readonly logger = new Logger(FallbackMailSender.name)

  constructor(
    private sendGridMailSender: SendGridMailSender,
    private resendMailSender: ResendMailSender,
  ) {}

  async send(request: SendMailRequest): Promise<void> {
    try {
      await this.sendGridMailSender.send(request)
    } catch (sendGridError) {
      this.logger.warn(
        'SendGrid failed, falling back to Resend',
        sendGridError instanceof Error ? sendGridError.stack : sendGridError,
      )

      try {
        await this.resendMailSender.send(request)
      } catch (resendError) {
        this.logger.error(
          'Resend also failed',
          resendError instanceof Error ? resendError.stack : resendError,
        )

        throw resendError
      }
    }
  }
}
