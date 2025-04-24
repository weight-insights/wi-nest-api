import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Request
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentDto } from './payment.dto';

@Controller('api/v1/payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post()
  async createPayment(@Request() req, @Body() body: PaymentDto) {
    const userId = req.user.sub;
    const payment = await this.paymentsService.create(userId, body);
    return payment;
  }

  @Delete('/game/:gameId/payment/:paymentId')
  async removePayment(@Request() req, @Param('gameId') gameId: string, @Param('paymentId') paymentId: string) {
    const userId = req.user.sub;
    const payment = await this.paymentsService.remove(userId, gameId, paymentId);
    return payment;
  }
}
