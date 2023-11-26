import { Game } from 'src/games/game.entity';
import { Hello } from 'src/hello/hello.entity';
import { Member } from 'src/members/member.entity';
import { Payment } from 'src/payments/payment.entity';
import { User } from 'src/users/user.entity';
import { Weight } from 'src/weights/weight.entity';

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions';
export const FirestoreCollectionProviders: string[] = [
  Game.collectionName,
  Member.collectionName,
  Payment.collectionName,
  User.collectionName,
  Weight.collectionName,
  Hello.collectionName,
];
