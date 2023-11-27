import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Game } from './game.entity';
import { CreateGameDto } from './dtos/create-game.dto';
import { CollectionReference } from '@google-cloud/firestore';
import { v4 as uuidv4 } from 'uuid';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class GamesService {
  constructor(
    @Inject(Game.collectionName)
    private gamesCollection: CollectionReference<Game>,
  ) {}

  async create(game: CreateGameDto, adminId: string) {
    const gameId = uuidv4();
    const newGame = {
      gameId,
      adminId,
      ...game,
      active: true,
    };
    await this.gamesCollection.doc(gameId).set(newGame);
    return newGame;
  }

  async find() {
    const snapshot = await this.gamesCollection.get();
    const games: Game[] = [];
    snapshot.forEach((doc) => games.push(doc.data()));
    return games;
  }

  async findOne(id: string) {
    const game = (await this.gamesCollection.doc(id).get())?.data();
    if (!game) {
      throw new NotFoundException('game not found');
    }
    return game;
  }

  async update(id: string, attrs: Partial<Game>) {
    const game = await this.findOne(id);
    if (!game) {
      throw new NotFoundException('game not found');
    }
    const updatedGame = instanceToPlain(Object.assign(game, attrs));
    await this.gamesCollection.doc(id).update(updatedGame);
    return updatedGame;
  }

  async remove(id: string) {
    const game = await this.findOne(id);
    if (!game) {
      throw new NotFoundException('game not found');
    }
    await this.gamesCollection.doc(id).delete();
    return game;
  }
}
