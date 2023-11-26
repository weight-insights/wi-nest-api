import { CollectionReference } from '@google-cloud/firestore';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type GameType = {
  id: string;
  name: string;
  admin: string;
  status: string;
};

@Injectable()
export class HelloService {
  constructor(
    private configService: ConfigService,
    @Inject('games') private gamesCollection: CollectionReference<GameType>,
  ) {}

  async find() {
    // return { message: this.configService.get<string>('HELLO_WORLD') };
    const snapshot = await this.gamesCollection.get();
    const games: GameType[] = [];
    snapshot.forEach((doc) => games.push(doc.data()));
    return games;
  }
}
