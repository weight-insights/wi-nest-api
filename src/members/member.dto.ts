export interface MemberDto {
  memberId: string;
  userId: string;
  gameId: string;
  name: string;
  weightGoal: number;
  vacationStartDate?: string;
  payments?: Record<string, number>;
  weights?: Record<string, number>;
}
