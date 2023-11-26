export class Member {
  static collectionName = 'members';

  memberId: string;
  userId: string;
  gameId: string;
  name: string;
  weightGoal: number;
  vacationStartDate: string;
  active: boolean;

  constructor(partial: Partial<Member>) {
    Object.assign(this, partial);
  }
}
