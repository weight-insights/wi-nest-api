export interface PaymentDto {
  gameId: string;
  amount: number;
  memberId?: string;
  paymentId?: string; // date yyyy-mm-dd
}
