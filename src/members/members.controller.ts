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
import { Member } from './member.entity';

@Controller('api/v1/members')
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Post()
  async createMember(@Body() body: Partial<Member>, @Request() req) {
    const userId = req.user.sub;
    const member = await this.membersService.create(body, userId);
    return member;
  }

  @Get('/:id')
  async findMember(@Param('id') id: string) {
    const member = await this.membersService.findOne(id);
    return member;
  }

  @Get('/user-id')
  async findMembersByUserId(@Request() req) {
    const userId = req.user.sub;
    const members = await this.membersService.findByUserId(userId);
    return members;
  }

  @Get('/game-id/:id')
  async findMembersByGameId(@Param('id') id: string) {
    const members = await this.membersService.findByGameId(id);
    return members;
  }

  @Get()
  async findAllMembers() {
    const members = await this.membersService.find();
    return members;
  }

  @Patch('/:id')
  async updateMember(@Param('id') id: string, @Body() body: Partial<Member>) {
    const member = await this.membersService.update(id, body);
    return member;
  }

  @Delete('/:id')
  async removeMember(@Param('id') id: string) {
    const member = await this.membersService.remove(id);
    return member;
  }
}
