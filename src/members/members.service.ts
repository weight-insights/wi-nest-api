import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Member } from './member.entity';
import { CollectionReference } from '@google-cloud/firestore';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MembersService {
  constructor(
    @Inject(Member.collectionName)
    private membersCollection: CollectionReference<Member>,
  ) {}

  async create(member: Partial<Member>, userId: string): Promise<Member> {
    const memberId = uuidv4();
    const newMember = { ...member, userId, memberId } as Member;
    await this.membersCollection.doc(memberId).set(newMember);
    return newMember;
  }

  async find(): Promise<Member[]> {
    const snapshot = await this.membersCollection.get();
    const members: Member[] = [];
    snapshot.forEach((doc) => members.push(doc.data() as Member));
    return members;
  }

  async findOne(id: string): Promise<Member> {
    const member = (await this.membersCollection.doc(id).get()).data();
    if (!member) {
      throw new NotFoundException('member not found');
    }
    return (member as Member);
  }

  async findByUserId(id: string): Promise<Member[]> {
    const snapshot = await this.membersCollection
      .where('userId', '==', id)
      .get();
    const members: Member[] = [];
    snapshot.forEach((doc) => members.push(doc.data() as Member));
    return members;
  }

  async findByGameId(id: string): Promise<Member[]> {
    const snapshot = await this.membersCollection
      .where('gameId', '==', id)
      .get();
    const members: Member[] = [];
    snapshot.forEach((doc) => members.push(doc.data()));
    return members;
  }

  async update(id: string, attrs: Partial<Member>): Promise<Member> {
    const member = await this.findOne(id);
    if (!member) {
      throw new NotFoundException('member not found');
    }
    const updatedMember = { ...member, ...attrs };
    await this.membersCollection.doc(id).update(updatedMember);
    return (updatedMember as Member);
  }

  async remove(id: string): Promise<Member> {
    const member = await this.findOne(id);
    if (!member) {
      throw new NotFoundException('member not found');
    }
    await this.membersCollection.doc(id).delete();
    return (member as Member);
  }
}
