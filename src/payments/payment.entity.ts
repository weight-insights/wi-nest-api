export class Payment {
  paymentId: string;
  gameId: string;
  memberId: string;
  payment: number;
  date: string;

  constructor(partial: Partial<Payment>) {
    Object.assign(this, partial);
  }
}
