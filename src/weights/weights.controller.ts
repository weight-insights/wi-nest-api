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
import { WeightsService } from './weights.service';
import { CreateWeightDto } from './dtos/create-weight.dto';
import { UpdateWeightDto } from './dtos/update-weight.dto';

@Controller('api/v1/weights')
export class WeightsController {
  constructor(private weightsService: WeightsService) {}

  @Post()
  async createWeight(@Body() body: CreateWeightDto) {
    const weight = this.weightsService.create(body);
    return weight;
  }

  @Get('/:id')
  async findWeight(@Param('id') id: string) {
    const weight = this.weightsService.findOne(id);
    return weight;
  }

  @Get('/member-id/:id')
  async findWeightsByMemberId(@Param('id') id: string) {
    const weights = this.weightsService.findByMemberId(id);
    return weights;
  }

  @Get('/game-id/:id')
  async findWeightsGameId(@Param('id') id: string) {
    const weights = this.weightsService.findByGameId(id);
    return weights;
  }

  @Get()
  async findAllWeights() {
    const weight = this.weightsService.find();
    return weight;
  }

  @Patch('/:id')
  updateWeight(@Param('id') id: string, @Body() body: UpdateWeightDto) {
    return this.weightsService.update(id, body);
  }

  @Delete('/:id')
  removeWeight(@Param('id') id: string, @Request() req) {
    console.log('userId', req.user.sub);
    console.log('email', req.user.username);
    return this.weightsService.remove(id);
  }
}
