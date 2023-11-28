import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Weight } from './weight.entity';
import { CreateWeightDto } from './dtos/create-weight.dto';
import { CollectionReference } from '@google-cloud/firestore';
import { v4 as uuidv4 } from 'uuid';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class WeightsService {
  constructor(
    @Inject(Weight.collectionName)
    private weightsCollection: CollectionReference<Weight>,
  ) {}

  async create(weight: CreateWeightDto) {
    const weightId = uuidv4();
    const newWeight = {
      ...weight,
      weightId,
      date: new Date().toLocaleDateString('en-ca'),
    };
    await this.weightsCollection.doc(weightId).set(newWeight);
    return weight;
  }

  async find() {
    const snapshot = await this.weightsCollection.get();
    const weights: Weight[] = [];
    snapshot.forEach((doc) => weights.push(doc.data()));
    return weights;
  }

  async findOne(id: string) {
    const weight = (await this.weightsCollection.doc(id).get())?.data();
    if (!weight) {
      throw new NotFoundException('weight not found');
    }
    return weight;
  }

  async findByMemberId(id: string) {
    const snapshot = await this.weightsCollection
      .where('memberId', '==', id)
      .get();
    const weights: Weight[] = [];
    snapshot.forEach((doc) => weights.push(doc.data()));
    return weights;
  }

  async findByGameId(id: string): Promise<Weight[]> {
    const snapshot = await this.weightsCollection
      .where('gameId', '==', id)
      .get();
    const weights: Weight[] = [];
    snapshot.forEach((doc) => weights.push(doc.data()));
    return weights;
  }

  async update(id: string, attrs: Partial<Weight>) {
    const weight = await this.findOne(id);
    if (!weight) {
      throw new NotFoundException('weight not found');
    }
    const updatedWeight = instanceToPlain(Object.assign(weight, attrs));
    await this.weightsCollection.doc(id).update(updatedWeight);
    return updatedWeight;
  }

  async remove(id: string) {
    const weight = await this.findOne(id);
    if (!weight) {
      throw new NotFoundException('weight not found');
    }
    await this.weightsCollection.doc(id).delete();
    return weight;
  }
}
