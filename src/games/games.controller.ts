import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './game.entity';
import { UpdateGameDto } from './dtos/update-game.dto';
import { CreateGameDto } from './dtos/create-game.dto';

@Controller('api/v1/games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Post()
  async createGame(@Body() body: CreateGameDto) {
    const game = await this.gamesService.create(body);
    return game;
  }

  @Get('/:id')
  async findGame(@Param('id') id: string) {
    const game: Game = await this.gamesService.findOne(id);
    return game;
  }

  @Get()
  findAllUsers(@Query('query') query = '') {
    return this.gamesService.find(query);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateGameDto) {
    return this.gamesService.update(id, body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string, @Request() req) {
    console.log('userId', req.user.sub);
    console.log('email', req.user.username);
    return this.gamesService.remove(id);
  }
}
