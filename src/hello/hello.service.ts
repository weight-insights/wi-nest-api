import { CollectionReference } from '@google-cloud/firestore';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Hello } from './hello.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class HelloService {
  constructor(
    @Inject(Hello.collectionName)
    private helloCollection: CollectionReference<Hello>,
  ) {}

  private readonly fakeHellos: Hello[] = [
    {
      message: 'Hello World!',
      helloId: '099e9830-9688-4d1e-af6b-94891a98e0b4',
      creationDate: '1978-07-14',
    },
    {
      message: 'Hey There',
      helloId: 'ad1708fa-937b-4c9e-b220-d22525aa8bb4',
      creationDate: '2005-02-03',
    },
    {
      message: 'Hi!!!',
      helloId: 'cd3fa4df-67a0-40ee-99b4-5b7a27b6f142',
      creationDate: '2009-10-01',
    },
  ];

  async create(message: string) {
    const helloId = uuidv4();
    const creationDate = new Date().toLocaleDateString('en-ca');
    const newHello = { helloId, message, creationDate } as Hello;
    await this.helloCollection.doc(helloId).set(newHello);
    return newHello;
  }

  async findOne(id: string) {
    const hello = (await this.helloCollection.doc(id).get())?.data();
    if (!hello) {
      throw new NotFoundException('hello not found');
    }
    return hello;
  }

  async find() {
    const snapshot = await this.helloCollection.get();
    const hellos: Hello[] = [];
    snapshot.forEach((doc) => hellos.push(doc.data() as Hello));
    return hellos;
  }

  findFake() {
    return this.fakeHellos;
  }

  async update(id: string, attrs: Partial<Hello>) {
    const oldHello = await this.findOne(id);
    if (!oldHello) {
      throw new NotFoundException('hello not found');
    }
    const updatedHello = { ...oldHello, ...attrs };
    await this.helloCollection.doc(id).update(updatedHello);
    return updatedHello;
  }

  async remove(id: string) {
    const hello = await this.findOne(id);
    if (!hello) {
      throw new NotFoundException('hello not found');
    }
    await this.helloCollection.doc(id).delete();
    return hello;
  }
}
