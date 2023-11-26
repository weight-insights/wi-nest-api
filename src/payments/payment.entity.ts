export class Payment {
  static collectionName = 'payments';

  paymentId: string;
  gameId: string;
  memberId: string;
  payment: number;
  date: string;

  constructor(partial: Partial<Payment>) {
    Object.assign(this, partial);
  }
}
