import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './game.entity';

@Controller('api/v1/games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Post()
  async createGame(@Body() body: Partial<Game>, @Request() req) {
    const adminId = req.user.sub;
    const game = await this.gamesService.create(body, adminId);
    return game;
  }

  @Get('/:id')
  async findGame(@Param('id') id: string) {
    const game = await this.gamesService.findOne(id);
    return game;
  }

  @Get()
  async findAllGames() {
    const games = await this.gamesService.find();
    return games;
  }

  // @Get()
  // async findAllGames(@Query('query') query = '') {
  //   return this.gamesService.find(query);
  // }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: Partial<Game>) {
    const game = await this.gamesService.update(id, body);
    return game;
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const game = await this.gamesService.remove(id);
    return game;
  }
}
