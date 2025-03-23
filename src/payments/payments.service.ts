import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MembersService } from 'src/members/members.service';
import { PaymentDto } from './payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private membersService: MembersService) {}

  async create(userId: string, payment: PaymentDto): Promise<PaymentDto> {
    if (!payment.gameId || !payment.amount) {
      throw new BadRequestException('gameId and amount are required');
    }

    const member = (await this.membersService.findByUserId(userId))?.find(member => member.gameId === payment.gameId);
    if (!member) {
      throw new NotFoundException('member not found');
    }

    const paymentId = new Date().toLocaleDateString('en-ca');
    const payments = member.payments ?? {};
    payments[paymentId] = payment.amount;
    await this.membersService.update(member.memberId, { payments });

    return ({ ...payment, paymentId, memberId: member.memberId } as PaymentDto);
  }

  async remove(userId: string, gameId: string, paymentId: string): Promise<PaymentDto> {
    if (!gameId || !paymentId) {
      throw new BadRequestException('gameId and paymentId are required');
    }

    const member = (await this.membersService.findByUserId(userId))?.find(member => member.gameId === gameId);
    if (!member) {
      throw new NotFoundException('member not found');
    }

    const oldAmount = member.payments ? member.payments[paymentId] : undefined;

    if (!oldAmount) {
      throw new NotFoundException('payment not found');
    }

    const payments = member.payments;
    payments[paymentId] = undefined;

    await this.membersService.update(member.memberId, { payments });
    return { gameId, amount: oldAmount, memberId: member.memberId, paymentId };
  }
}
