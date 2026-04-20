import { Module } from '@nestjs/common'
import { EnvModule } from '@/infra/env/env.module'
import { MailSender } from '@/domain/event/application/mail/mail-sender'
import { SendGridMailSender } from './sendgrid-mail-sender'
import { ResendMailSender } from './resend-mail-sender'
import { FallbackMailSender } from './fallback-mail-sender'

@Module({
  imports: [EnvModule],
  providers: [
    SendGridMailSender,
    ResendMailSender,
    FallbackMailSender,
    {
      provide: MailSender,
      useExisting: FallbackMailSender,
    },
  ],
  exports: [MailSender],
})
export class MailModule {}
