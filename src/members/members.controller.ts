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
import { MembersService } from './members.service';
import { CreateMemberDto } from './dtos/create-member.dto';
import { UpdateMemberDto } from './dtos/update-member.dto';
import { plainToInstance } from 'class-transformer';
import { Member } from './member.entity';

@Controller('api/v1/members')
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Post()
  async createMember(@Body() body: CreateMemberDto, @Request() req) {
    const userId = req.user.sub;
    const member = await this.membersService.create(body, userId);
    return plainToInstance(Member, member);
  }

  @Get('/:id')
  async findMember(@Param('id') id: string) {
    const member = await this.membersService.findOne(id);
    return plainToInstance(Member, member);
  }

  @Get('/user-id')
  async findMembersByUserId(@Request() req) {
    const userId = req.user.sub;
    const members = await this.membersService.findByUserId(userId);
    return plainToInstance(Member, members);
  }

  @Get('/game-id/:id')
  async findMembersByGameId(@Param('id') id: string) {
    const members = await this.membersService.findByGameId(id);
    return plainToInstance(Member, members);
  }

  @Get()
  async findAllMembers() {
    const members = await this.membersService.find();
    return plainToInstance(Member, members);
  }

  @Patch('/:id')
  async updateMember(@Param('id') id: string, @Body() body: UpdateMemberDto) {
    const member = await this.membersService.update(id, body);
    return plainToInstance(Member, member);
  }

  @Delete('/:id')
  async removeMember(@Param('id') id: string) {
    const member = await this.membersService.remove(id);
    return plainToInstance(Member, member);
  }
}
