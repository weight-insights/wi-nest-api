import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { CollectionReference } from '@google-cloud/firestore';
import { v4 as uuidv4 } from 'uuid';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(Payment.collectionName)
    private paymentsCollection: CollectionReference<Payment>,
  ) {}

  async create(payment: CreatePaymentDto) {
    const paymentId = uuidv4();
    const newPayment = {
      ...payment,
      paymentId,
      date: new Date().toLocaleDateString('en-ca'),
    };
    await this.paymentsCollection.doc(paymentId).set(newPayment);
    return newPayment;
  }

  async find() {
    const snapshot = await this.paymentsCollection.get();
    const payments: Payment[] = [];
    snapshot.forEach((doc) => payments.push(doc.data()));
    return payments;
  }

  async findOne(id: string) {
    const payment = (await this.paymentsCollection.doc(id).get()).data();
    if (!payment) {
      throw new NotFoundException('payment not found');
    }
    return payment;
  }

  async findByMemberId(id: string): Promise<Payment[]> {
    const snapshot = await this.paymentsCollection
      .where('memberId', '==', id)
      .get();
    const payments: Payment[] = [];
    snapshot.forEach((doc) => payments.push(doc.data()));
    return payments;
  }

  async findByGameId(id: string): Promise<Payment[]> {
    const snapshot = await this.paymentsCollection
      .where('gameId', '==', id)
      .get();
    const payments: Payment[] = [];
    snapshot.forEach((doc) => payments.push(doc.data()));
    return payments;
  }

  async update(id: string, attrs: Partial<Payment>) {
    const payment = await this.findOne(id);
    if (!payment) {
      throw new NotFoundException('payment not found');
    }
    const updatedPayment = instanceToPlain(Object.assign(payment, attrs));
    await this.paymentsCollection.doc(id).update(updatedPayment);
    return updatedPayment;
  }

  async remove(id: string): Promise<Payment | undefined> {
    const payment = await this.findOne(id);
    if (!payment) {
      throw new NotFoundException('payment not found');
    }
    await this.paymentsCollection.doc(id).delete();
    return payment;
  }
}
