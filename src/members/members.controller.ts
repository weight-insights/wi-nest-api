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

@Controller('api/v1/members')
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Post()
  async createMember(@Body() body: CreateMemberDto, @Request() req) {
    const member = this.membersService.create(body, req.userId);
    return member;
  }

  @Get('/:id')
  async findMember(@Param('id') id: string) {
    const member = this.membersService.findOne(id);
    return member;
  }

  @Get('/user-id')
  async findMembersByUserId(@Request() req) {
    const members = this.membersService.findByUserId(req.userId);
    return members;
  }

  @Get('/game-id/:id')
  async findMembersGameId(@Param('id') id: string) {
    const members = this.membersService.findByGameId(id);
    return members;
  }

  @Get()
  async findAllMembers() {
    const member = this.membersService.find();
    return member;
  }

  @Patch('/:id')
  updateMember(@Param('id') id: string, @Body() body: UpdateMemberDto) {
    return this.membersService.update(id, body);
  }

  @Delete('/:id')
  removeMember(@Param('id') id: string, @Request() req) {
    console.log('userId', req.user.sub);
    console.log('email', req.user.username);
    return this.membersService.remove(id);
  }
}
