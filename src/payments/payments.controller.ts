import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { UpdatePaymentDto } from './dtos/update-payment.dto';
import { plainToInstance } from 'class-transformer';
import { Payment } from './payment.entity';

@Controller('api/v1/payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post()
  async createPayment(@Body() body: CreatePaymentDto) {
    const payment = await this.paymentsService.create(body);
    return plainToInstance(Payment, payment);
  }

  @Get('/:id')
  async findPayment(@Param('id') id: string) {
    const payment = await this.paymentsService.findOne(id);
    return plainToInstance(Payment, payment);
  }

  @Get('/member-id/:id')
  async findPaymentsByMemberId(@Param('id') id: string) {
    const payments = await this.paymentsService.findByMemberId(id);
    return plainToInstance(Payment, payments);
  }

  @Get('/game-id/:id')
  async findPaymentsByGameId(@Param('id') id: string) {
    const payments = await this.paymentsService.findByGameId(id);
    return plainToInstance(Payment, payments);
  }

  @Get()
  async findAllPayments() {
    const payments = await this.paymentsService.find();
    return plainToInstance(Payment, payments);
  }

  @Patch('/:id')
  async updatePayment(@Param('id') id: string, @Body() body: UpdatePaymentDto) {
    const payment = await this.paymentsService.update(id, body);
    return plainToInstance(Payment, payment);
  }

  @Delete('/:id')
  async removePayment(@Param('id') id: string) {
    const payment = await this.paymentsService.remove(id);
    return plainToInstance(Payment, payment);
  }
}
