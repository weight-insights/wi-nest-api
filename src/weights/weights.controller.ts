import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Request
} from '@nestjs/common';
import { WeightsService } from './weights.service';
import { WeightDto } from './weight.dto';

@Controller('api/v1/weights')
export class WeightsController {
  constructor(private weightsService: WeightsService) {}

  @Post()
  async createWeight(@Request() req, @Body() body: WeightDto) {
    const userId = req.user.sub;
    const weight = await this.weightsService.create(userId, body);
    return weight;
  }

  @Delete('/game/:gameId/weight/:weightId')
  async removeWeight(@Request() req, @Param('gameId') gameId: string, @Param('weightId') weightId: string) {
    const userId = req.user.sub;
    const weight = await this.weightsService.remove(userId, gameId, weightId);
    return weight;
  }
}
