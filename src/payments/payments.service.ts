import { Injectable, NotFoundException } from '@nestjs/common';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dtos/create-payment.dto';

@Injectable()
export class PaymentsService {
  private readonly payments: Payment[] = [
    {
      paymentId: 'qwer123',
      memberId: 'abc123',
      gameId: 'asdf123',
      payment: 10,
      date: '1978-07-14',
    },
  ];

  async create(payment: CreatePaymentDto): Promise<Payment> {
    return new Payment({
      ...payment,
      date: new Date().toLocaleDateString('en-ca'),
    });
  }

  async find(): Promise<Payment[]> {
    return this.payments;
  }

  async findOne(id: string): Promise<Payment | undefined> {
    const payment: Payment = this.payments.find((p) => p.paymentId === id);
    if (!payment) {
      throw new NotFoundException('payment not found');
    }
    return payment;
  }

  async findByMemberId(id: string): Promise<Payment[]> {
    const payment: Payment[] = this.payments.filter((p) => p.memberId === id);
    return payment;
  }

  async findByGameId(id: string): Promise<Payment[]> {
    const payments: Payment[] = this.payments.filter((p) => p.gameId === id);
    return payments;
  }

  async update(
    id: string,
    attrs: Partial<Payment>,
  ): Promise<Payment | undefined> {
    const payment = await this.findOne(id);
    // TODO verify how the db server respond to a not found
    if (!payment) {
      throw new NotFoundException('payment not found');
    }
    Object.assign(payment, attrs);
    return payment;
  }

  async remove(id: string): Promise<Payment | undefined> {
    const payment = await this.findOne(id);
    // TODO verify how the db server respond to a not found
    if (!payment) {
      throw new NotFoundException('payment not found');
    }
    return payment;
  }
}
