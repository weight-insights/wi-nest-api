import {Body,Controller,Delete,Get,Param,Patch,Post,Request,} from '@nestjs/common';
import { MembersService } from './members.service';
import { Member } from './member.entity';
import { MemberCreateDto } from './memberCreate.dto';
import { ForbiddenException } from '@nestjs/common';
import { MemberDto } from './member.dto';

@Controller('api/v1/members')
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Post()
  async createMember(@Body() body: MemberCreateDto) {
    const member = await this.membersService.create(body.gameId, body.email);
    return member;
  }

@Get('demo/game/:gameId')
getDemoMembers(
  @Param('gameId') gameId: string,
  @Request() req,
): MemberDto[] {
  // Never expose mock data in production.
  if (
    process.env.NODE_ENV === 'production' ||
    process.env.ENABLE_DEMO_DATA !== 'true'
  ) {
    throw new ForbiddenException('Demo data is disabled');
  }

  const currentUserId = req.user.sub;

  return [
    {
      memberId: 'demo-1',
      userId: currentUserId,
      gameId,
      name: 'Luiza',
      weightGoal: 78,
      weights: {
        '2026-10-02': 86,
        '2026-10-09': 85.3,
        '2026-10-16': 84.7,
        '2026-10-23': 85.2,
        '2026-10-30': 83.9,
      },
      payments: {
        '2026-10-02': 5,
        '2026-10-16': 5,
      },
    },
    {
      memberId: 'demo-2',
      userId: 'demo-user-2',
      gameId,
      name: 'UN TALIBAN',
      weightGoal: 70,
      weights: {
        '2026-10-02': 78,
        '2026-10-09': 77.1,
        '2026-10-16': 76.8,
        '2026-10-23': 76.4,
        '2026-10-30': 76,
      },
      payments: { '2026-10-02': 5 },
    },
    {
      memberId: 'demo-3',
      userId: 'demo-user-3',
      gameId,
      name: 'Tiagaon',
      weightGoal: 92,
      weights: {
        '2026-10-02': 102,
        '2026-10-09': 101.4,
        '2026-10-16': 100.5,
        '2026-10-23': 101,
        '2026-10-30': 99.6,
      },
      payments: { '2026-10-02': 5 },
    },
    {
      memberId: 'demo-4',
      userId: 'demo-user-4',
      gameId,
      name: 'Madame',
      weightGoal: 80,
      weights: {
        '2026-10-02': 91,
        '2026-10-09': 90,
        '2026-10-16': 89.3,
        '2026-10-23': 88.8,
        '2026-10-30': 88.2,
      },
      payments: { '2026-10-02': 5 },
    },
    {
      memberId: 'demo-5',
      userId: 'demo-user-5',
      gameId,
      name: 'yo',
      weightGoal: 82,
      weights: {
        '2026-10-02': 88,
        '2026-10-09': 87.7,
        '2026-10-16': 87.9,
        '2026-10-23': 87.4,
        '2026-10-30': 87,
      },
      payments: { '2026-10-02': 5 },
    },
  ];
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
