export class Member {
  static collectionName = 'members';

  memberId: string;
  userId: string;
  gameId: string;
  name: string;
  weightGoal: number;
  vacationStartDate?: string;
  payments?: Record<string, number>;
  weights?: Record<string, number>;

  constructor(partial: Partial<Member>) {
    Object.assign(this, partial);
  }
}
