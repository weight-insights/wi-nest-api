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

    const members = (await this.membersService.findByUserIdAndGameId(weight.gameId, userId));
    if (!members.length) {
      throw new NotFoundException('member not found');
    }
    
    //i love java hehe 
    
    const weightId = new Date().toLocaleDateString('en-ca');
    const weights = members[0].weights ?? {};
    weights[weightId] = weight.amount;
    await this.membersService.update(members[0].memberId, { weights });

    return ({ ...weight, weightId, memberId: members[0].memberId } as WeightDto);
  }

  async remove(userId: string, gameId: string, weightId: string): Promise<WeightDto> {
    if (!gameId || !weightId) {
      throw new BadRequestException('gameId and weightId are required');
    }

    const members = (await this.membersService.findByUserIdAndGameId(gameId, userId));
    if (!members.length) {
      throw new NotFoundException('member not found');
    }

    const oldAmount = members[0].weights ? members[0].weights[weightId] : undefined;

    if (!oldAmount) {
      throw new NotFoundException('weight not found');
    }

    const weights = members[0].weights;
    weights[weightId] = undefined;

    await this.membersService.update(members[0].memberId, { weights });
    return { gameId, amount: oldAmount, memberId: members[0].memberId, weightId };
  }
}
