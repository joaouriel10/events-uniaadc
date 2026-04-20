export interface GeneratePixRequest {
  value: number
  transactionId: string
}

export interface GeneratePixResponse {
  payload: string
  qrCode: string
}

export abstract class PixGenerator {
  abstract generate(request: GeneratePixRequest): Promise<GeneratePixResponse>
}
