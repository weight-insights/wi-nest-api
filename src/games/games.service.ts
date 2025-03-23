import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Game } from './game.entity';
import { CollectionReference } from '@google-cloud/firestore';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GamesService {
  constructor(
    @Inject(Game.collectionName)
    private gamesCollection: CollectionReference<Game>,
  ) {}

  async create(game: Partial<Game>, adminId: string): Promise<Game> {
    const gameId = uuidv4();
    const newGame = {
      ...game,
      gameId,
      adminId,
    } as Game;
    await this.gamesCollection.doc(gameId).set(newGame);
    return newGame;
  }

  async find(): Promise<Game[]> {
    const snapshot = await this.gamesCollection.get();
    const games: Game[] = [];
    snapshot.forEach((doc) => games.push(doc.data() as Game));
    return games;
  }

  async findOne(id: string): Promise<Game> {
    const game = (await this.gamesCollection.doc(id).get())?.data();
    if (!game) {
      throw new NotFoundException('game not found');
    }
    return (game as Game);
  }

  async update(id: string, attrs: Partial<Game>): Promise<Game> {
    const game = await this.findOne(id);
    if (!game) {
      throw new NotFoundException('game not found');
    }
    const updatedGame = { ...game, ...attrs, gameId: id };
    await this.gamesCollection.doc(id).update(updatedGame);
    return (updatedGame as Game);
  }

  async remove(id: string): Promise<Game> {
    const game = await this.findOne(id);
    if (!game) {
      throw new NotFoundException('game not found');
    }
    await this.gamesCollection.doc(id).delete();
    return (game as Game);
  }
}
