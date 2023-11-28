import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WeightsService } from './weights.service';
import { CreateWeightDto } from './dtos/create-weight.dto';
import { UpdateWeightDto } from './dtos/update-weight.dto';
import { plainToInstance } from 'class-transformer';
import { Weight } from './weight.entity';

@Controller('api/v1/weights')
export class WeightsController {
  constructor(private weightsService: WeightsService) {}

  @Post()
  async createWeight(@Body() body: CreateWeightDto) {
    const weight = await this.weightsService.create(body);
    return plainToInstance(Weight, weight);
  }

  @Get('/:id')
  async findWeight(@Param('id') id: string) {
    const weight = await this.weightsService.findOne(id);
    return plainToInstance(Weight, weight);
  }

  @Get('/member-id/:id')
  async findWeightsByMemberId(@Param('id') id: string) {
    const weights = await this.weightsService.findByMemberId(id);
    return plainToInstance(Weight, weights);
  }

  @Get('/game-id/:id')
  async findWeightsByGameId(@Param('id') id: string) {
    const weights = await this.weightsService.findByGameId(id);
    return plainToInstance(Weight, weights);
  }

  @Get()
  async findAllWeights() {
    const weights = await this.weightsService.find();
    return plainToInstance(Weight, weights);
  }

  @Patch('/:id')
  async updateWeight(@Param('id') id: string, @Body() body: UpdateWeightDto) {
    const weight = await this.weightsService.update(id, body);
    return plainToInstance(Weight, weight);
  }

  @Delete('/:id')
  async removeWeight(@Param('id') id: string) {
    const weight = await this.weightsService.remove(id);
    return plainToInstance(Weight, weight);
  }
}
