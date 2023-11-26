export class Weight {
  static collectionName = 'weights';

  weightId: string;
  gameId: string;
  memberId: string;
  weight: number;
  date: string;

  constructor(partial: Partial<Weight>) {
    Object.assign(this, partial);
  }
}
