import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Member } from './member.entity';
import { CreateMemberDto } from './dtos/create-member.dto';
import { CollectionReference } from '@google-cloud/firestore';
import { v4 as uuidv4 } from 'uuid';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class MembersService {
  constructor(
    @Inject(Member.collectionName)
    private membersCollection: CollectionReference<Member>,
  ) {}

  async create(member: CreateMemberDto, userId) {
    const memberId = uuidv4();
    const newMember = {
      ...member,
      userId,
      memberId,
      active: false,
      vacationStartDate: '',
    };
    await this.membersCollection.doc(memberId).set(newMember);
    return newMember;
  }

  async find() {
    const snapshot = await this.membersCollection.get();
    const members: Member[] = [];
    snapshot.forEach((doc) => members.push(doc.data()));
    return members;
  }

  async findOne(id: string) {
    const member = (await this.membersCollection.doc(id).get()).data();
    if (!member) {
      throw new NotFoundException('member not found');
    }
    return member;
  }

  async findByUserId(id: string) {
    const snapshot = await this.membersCollection
      .where('userId', '==', id)
      .get();
    const members: Member[] = [];
    snapshot.forEach((doc) => members.push(doc.data()));
    return members;
  }

  async findByGameId(id: string) {
    const snapshot = await this.membersCollection
      .where('gameId', '==', id)
      .get();
    const members: Member[] = [];
    snapshot.forEach((doc) => members.push(doc.data()));
    return members;
  }

  async update(id: string, attrs: Partial<Member>) {
    const member = await this.findOne(id);
    if (!member) {
      throw new NotFoundException('member not found');
    }
    const updatedMember = instanceToPlain(Object.assign(member, attrs));
    await this.membersCollection.doc(id).update(updatedMember);
    return updatedMember;
  }

  async remove(id: string) {
    const member = await this.findOne(id);
    if (!member) {
      throw new NotFoundException('member not found');
    }
    await this.membersCollection.doc(id).delete();
    return member;
  }
}
