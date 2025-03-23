import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MembersService } from 'src/members/members.service';
import { WeightDto } from './weight.dto';

@Injectable()
export class WeightsService {
  constructor(private membersService: MembersService) {}

  async create(userId: string, weight: WeightDto): Promise<WeightDto> {
    if (!weight.gameId || !weight.amount) {
      throw new BadRequestException('gameId and amount are required');
    }

    const member = (await this.membersService.findByUserId(userId))?.find(member => member.gameId === weight.gameId);
    if (!member) {
      throw new NotFoundException('member not found');
    }

    const weightId = new Date().toLocaleDateString('en-ca');
    const weights = member.weights ?? {};
    weights[weightId] = weight.amount;
    await this.membersService.update(member.memberId, { weights });

    return ({ ...weight, weightId, memberId: member.memberId } as WeightDto);
  }

  async remove(userId: string, gameId: string, weightId: string): Promise<WeightDto> {
    if (!gameId || !weightId) {
      throw new BadRequestException('gameId and weightId are required');
    }

    const member = (await this.membersService.findByUserId(userId))?.find(member => member.gameId === gameId);
    if (!member) {
      throw new NotFoundException('member not found');
    }

    const oldAmount = member.weights ? member.weights[weightId] : undefined;

    if (!oldAmount) {
      throw new NotFoundException('weight not found');
    }

    const weights = member.weights;
    weights[weightId] = undefined;

    await this.membersService.update(member.memberId, { weights });
    return { gameId, amount: oldAmount, memberId: member.memberId, weightId };
  }
}
