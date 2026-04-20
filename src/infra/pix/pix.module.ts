import { Module } from '@nestjs/common'
import { EnvModule } from '@/infra/env/env.module'
import { PixGenerator } from '@/domain/event/application/pix/pix-generator'
import { QrCodePixGenerator } from './qrcode-pix-generator'

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: PixGenerator,
      useClass: QrCodePixGenerator,
    },
  ],
  exports: [PixGenerator],
})
export class PixModule {}
