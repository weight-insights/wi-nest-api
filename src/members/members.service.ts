import { Injectable, NotFoundException } from '@nestjs/common';
import { Member } from './member.entity';
import { CreateMemberDto } from './dtos/create-member.dto';

@Injectable()
export class MembersService {
  private readonly members: Member[] = [
    {
      memberId: 'qwer123',
      userId: 'abc123',
      name: '',
      gameId: 'asdf123',
      weightGoal: 85,
      vacationStartDate: '',
      active: true,
    },
  ];

  async create(member: CreateMemberDto, userId): Promise<Member> {
    return new Member({
      ...member,
      memberId: 'qwert1234',
      userId,
      vacationStartDate: '',
      active: false,
    });
  }

  async find(): Promise<Member[]> {
    return this.members;
  }

  async findOne(id: string): Promise<Member | undefined> {
    const member: Member = this.members.find(
      (member) => member.memberId === id,
    );
    if (!member) {
      throw new NotFoundException('member not found');
    }
    return member;
  }

  async findByUserId(id: string): Promise<Member[]> {
    const members: Member[] = this.members.filter(
      (member) => member.userId === id,
    );
    return members;
  }

  async findByGameId(id: string): Promise<Member[]> {
    const members: Member[] = this.members.filter(
      (member) => member.gameId === id,
    );
    return members;
  }

  async update(
    id: string,
    attrs: Partial<Member>,
  ): Promise<Member | undefined> {
    const member = await this.findOne(id);
    // TODO verify how the db server respond to a not found
    if (!member) {
      throw new NotFoundException('user not found');
    }
    Object.assign(member, attrs);
    return member;
  }

  async remove(id: string): Promise<Member | undefined> {
    const member = await this.findOne(id);
    // TODO verify how the db server respond to a not found
    if (!member) {
      throw new NotFoundException('user not found');
    }
    return member;
  }
}
