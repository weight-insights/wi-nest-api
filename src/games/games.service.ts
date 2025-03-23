import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Game } from './game.entity';
import { CollectionReference } from '@google-cloud/firestore';
import { GameDto } from './game.dto';

@Injectable()
export class GamesService {
  constructor(
    @Inject(Game.collectionName)
    private gamesCollection: CollectionReference<Game>,
  ) {}

  async create(game: Partial<Game>, adminId: string): Promise<GameDto> {
    game.adminId = adminId;
    if (!game.name || !game.startDate || !game.gameLength) {
      throw new BadRequestException('missing fields');
    }
    game.gamePeriod = game.gamePeriod ?? 7;
    game.minWeightLoss = game.minWeightLoss ?? 0.1;
    game.weightUnit = game.weightUnit ?? 'kg';
    game.fee = game.fee ?? 5;
    game.currency = game.currency ?? 'CAD';
    game.vacationLength = game.vacationLength ?? 0;
    if (game.gameLength - game.vacationLength < 3) {
      throw new BadRequestException('gameLength must be greater or equal than vacationLength + 3');
    }
    const res = await this.gamesCollection.add(game as Game);
    const newGame = {
      ...game,
      gameId: res.id,
    } as GameDto;
    return newGame;
  }

  async find(): Promise<GameDto[]> {
    const snapshot = await this.gamesCollection.get();
    const games: GameDto[] = [];
    snapshot.forEach((doc) => games.push(this.parseGameEntityToDto(doc)));
    return games;
  }

  async findOne(id: string): Promise<GameDto> {
    const doc = await this.gamesCollection.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException('game not found');
    }
    return this.parseGameEntityToDto(doc);
  }

  async update(id: string, attrs: Partial<Game>): Promise<GameDto> {
    const game = await this.findOne(id);
    if (!game) {
      throw new NotFoundException('game not found');
    }
    const updatedGame = { ...game, ...attrs, gameId: id } as GameDto;
    await this.gamesCollection.doc(id).update(attrs);
    return updatedGame;
  }

  async remove(id: string): Promise<GameDto> {
    const game = await this.findOne(id);
    if (!game) {
      throw new NotFoundException('game not found');
    }
    await this.gamesCollection.doc(id).delete();
    return game;
  }

  private parseGameEntityToDto(doc: { id: string; data: () => Game; }): GameDto {
    const docData = doc.data();
    const gameDto: GameDto = {
      gameId: doc.id,
      adminId: docData.adminId,
      name: docData.name,
      info: docData.info,
      startDate: docData.startDate,
      gameLength: docData.gameLength, // total number of weight events, including the first and final
      gameTimeZone: docData.gameTimeZone,
      gamePeriod: docData.gamePeriod, // number of days between weight events, standard of 7 (1 week)
      minWeightLoss: docData.minWeightLoss,
      weightUnit: docData.weightUnit,
      fee: docData.fee,
      currency: docData.currency,
      vacationLength: docData.vacationLength
    } as GameDto;
    return gameDto;
  }
}
