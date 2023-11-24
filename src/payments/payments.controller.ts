import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { UpdatePaymentDto } from './dtos/update-payment.dto';

@Controller('api/v1/payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post()
  async createPayment(@Body() body: CreatePaymentDto) {
    const payment = this.paymentsService.create(body);
    return payment;
  }

  @Get('/:id')
  async findPayment(@Param('id') id: string) {
    const payment = this.paymentsService.findOne(id);
    return payment;
  }

  @Get('/member-id/:id')
  async findPaymentsByMemberId(@Param('id') id: string) {
    const payments = this.paymentsService.findByMemberId(id);
    return payments;
  }

  @Get('/game-id/:id')
  async findPaymentsGameId(@Param('id') id: string) {
    const payments = this.paymentsService.findByGameId(id);
    return payments;
  }

  @Get()
  async findAllPayments() {
    const payment = this.paymentsService.find();
    return payment;
  }

  @Patch('/:id')
  updatePayment(@Param('id') id: string, @Body() body: UpdatePaymentDto) {
    return this.paymentsService.update(id, body);
  }

  @Delete('/:id')
  removePayment(@Param('id') id: string, @Request() req) {
    console.log('userId', req.user.sub);
    console.log('email', req.user.username);
    return this.paymentsService.remove(id);
  }
}
