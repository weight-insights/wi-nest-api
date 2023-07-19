import { Weight } from './weight.entity';
import { Payment } from './payment.entity';

export class Member {
  id: number;
  userId: number;
  gameId: number;
  weightGoal: number;
  vacationStartDate: string;
  status: string;
  weights: Weight[];
  payments: Payment[];
}
