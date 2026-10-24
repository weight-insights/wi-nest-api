import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Member } from './member.entity';
import { CollectionReference } from '@google-cloud/firestore';
import { MemberDto } from './member.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MembersService {
  constructor(
    @Inject(Member.collectionName)
    private membersCollection: CollectionReference<Member>,
    private usersService: UsersService
  ) {}

  async create(gameId: string, email: string): Promise<MemberDto> {
    if (!gameId || !email) {
      throw new BadRequestException('missing fields');
    }
    const user = await this.usersService.findByEmail(email);
    const member = {userId: user.userId, gameId, name: user.name}; 
    const res = await this.membersCollection.add(member as Member);
    const newMember = { ...member, memberId: res.id } as MemberDto;
    return newMember;
  }

  async find(): Promise<MemberDto[]> {
    const snapshot = await this.membersCollection.get();
    const members: MemberDto[] = [];
    snapshot.forEach((doc) => members.push(this.parseMemberEntityToDto(doc)));
    return members;
  }

  async findOne(id: string): Promise<MemberDto> {
    const doc = await this.membersCollection.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException('member not found');
    }
    return this.parseMemberEntityToDto(doc);
  }

  async findByUserId(id: string): Promise<MemberDto[]> {
    const snapshot = await this.membersCollection
      .where('userId', '==', id)
      .get();
    const members: MemberDto[] = [];
    snapshot.forEach((doc) => members.push(this.parseMemberEntityToDto(doc)));
    return members;
  }

  async findByGameId(id: string): Promise<MemberDto[]> {
    const snapshot = await this.membersCollection
      .where('gameId', '==', id)
      .get();
    const members: MemberDto[] = [];
    snapshot.forEach((doc) => members.push(this.parseMemberEntityToDto(doc)));
    return members;
  }

  async findByUserIdAndGameId(gameId: string, userId: string): Promise<MemberDto[]> {
    const snapshot = await this.membersCollection
      .where('gameId', '==', gameId)
      .where('userId', '==', userId)
      .get();
    const members: MemberDto[] = [];
    snapshot.forEach((doc) => members.push(this.parseMemberEntityToDto(doc)));
    return members;
  }

  async findGamesIdsByUserId(userId: string): Promise<string[]> {
    const snapshot = await this.membersCollection
      .where('userId', '==', userId)
      .get();
      const gameIds: string[] = [];
      snapshot.forEach((doc) => gameIds.push(doc.data().gameId));

    return gameIds;
  }

  async update(id: string, attrs: Partial<Member>): Promise<Member> {
    const member = await this.findOne(id);
    if (!member) {
      throw new NotFoundException('member not found');
    }
    const updatedMember = { ...member, ...attrs };
    await this.membersCollection.doc(id).update(attrs);
    return (updatedMember as Member);
  }

  async remove(id: string): Promise<Member> {
    const member = await this.findOne(id);
    if (!member) {
      throw new NotFoundException('member not found');
    }
    await this.membersCollection.doc(id).delete();
    return member;
  }

  private parseMemberEntityToDto(doc: { id: string; data: () => Member; }): MemberDto {
      const memberDto = {
        ...doc.data(),
        memberId: doc.id
      } as MemberDto;
      return memberDto;
    }
}
