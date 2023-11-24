import { Injectable, NotFoundException } from '@nestjs/common';
import { Weight } from './weight.entity';
import { CreateWeightDto } from './dtos/create-weight.dto';

@Injectable()
export class WeightsService {
  private readonly weights: Weight[] = [
    {
      weightId: 'qwer123',
      memberId: 'abc123',
      gameId: 'asdf123',
      weight: 85,
      date: '1978-07-14',
    },
  ];

  async create(weight: CreateWeightDto): Promise<Weight> {
    return new Weight({
      ...weight,
      date: new Date().toLocaleDateString('en-ca'),
    });
  }

  async find(): Promise<Weight[]> {
    return this.weights;
  }

  async findOne(id: string): Promise<Weight | undefined> {
    const weight: Weight = this.weights.find((w) => w.weightId === id);
    if (!weight) {
      throw new NotFoundException('weight not found');
    }
    return weight;
  }

  async findByMemberId(id: string): Promise<Weight[]> {
    const weights: Weight[] = this.weights.filter((w) => w.memberId === id);
    return weights;
  }

  async findByGameId(id: string): Promise<Weight[]> {
    const weights: Weight[] = this.weights.filter((w) => w.gameId === id);
    return weights;
  }

  async update(
    id: string,
    attrs: Partial<Weight>,
  ): Promise<Weight | undefined> {
    const weight = await this.findOne(id);
    // TODO verify how the db server respond to a not found
    if (!weight) {
      throw new NotFoundException('weight not found');
    }
    Object.assign(weight, attrs);
    return weight;
  }

  async remove(id: string): Promise<Weight | undefined> {
    const weight = await this.findOne(id);
    // TODO verify how the db server respond to a not found
    if (!weight) {
      throw new NotFoundException('weight not found');
    }
    return weight;
  }
}
