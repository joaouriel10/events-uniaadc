import { Injectable } from '@nestjs/common'

import {
  PixGenerator,
  GeneratePixRequest,
  GeneratePixResponse,
} from '@/domain/event/application/pix/pix-generator'
import { EnvService } from '@/infra/env/env.service'

import { QrCodePix } from 'qrcode-pix'

@Injectable()
export class QrCodePixGenerator implements PixGenerator {
  constructor(private envService: EnvService) {}

  async generate({
    value,
    transactionId,
  }: GeneratePixRequest): Promise<GeneratePixResponse> {
    const qrCodePix = QrCodePix({
      version: '01',
      key: this.envService.get('PIX_KEY'),
      name: this.envService.get('PIX_NAME'),
      city: this.envService.get('PIX_CITY'),
      transactionId,
      value,
    })

    const payload = qrCodePix.payload()
    const qrCode = await qrCodePix.base64()

    return { payload, qrCode }
  }
}
