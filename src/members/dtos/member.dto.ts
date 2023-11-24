import { Payment } from '../../payments/payment.entity';
import { Weight } from '../../weights/weight.entity';

export class MemberDto {
  memberId: string;
  userId: number;
  gameId: number;
  weightGoal: number;
  vacationStartDate: string;
  status: string;
  weights: Weight[];
  payments: Payment[];
}
