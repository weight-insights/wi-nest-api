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

    const members = (await this.membersService.findByUserIdAndGameId(payment.gameId, userId));
    if (!members.length) {
      throw new NotFoundException('member not found');
    }

    const paymentId = new Date().toLocaleDateString('en-ca');
    const payments = members[0].payments ?? {};
    payments[paymentId] = payment.amount;
    await this.membersService.update(members[0].memberId, { payments });

    return ({ ...payment, paymentId, memberId: members[0].memberId } as PaymentDto);
  }

  async remove(userId: string, gameId: string, paymentId: string): Promise<PaymentDto> {
    if (!gameId || !paymentId) {
      throw new BadRequestException('gameId and paymentId are required');
    }

    const members = (await this.membersService.findByUserIdAndGameId(gameId, userId));
    if (!members.length) {
      throw new NotFoundException('member not found');
    }

    const oldAmount = members[0].payments ? members[0].payments[paymentId] : undefined;

    if (!oldAmount) {
      throw new NotFoundException('payment not found');
    }

    const payments = members[0].payments;
    payments[paymentId] = undefined;

    await this.membersService.update(members[0].memberId, { payments });
    return { gameId, amount: oldAmount, memberId: members[0].memberId, paymentId };
  }
}
