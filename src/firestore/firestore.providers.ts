import { Game } from 'src/games/game.entity';
import { Hello } from 'src/hello/hello.entity';
import { Member } from 'src/members/member.entity';
import { User } from 'src/users/user.entity';

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions';
export const FirestoreCollectionProviders: string[] = [
  Game.collectionName,
  Member.collectionName,
  User.collectionName,
  Hello.collectionName
];
