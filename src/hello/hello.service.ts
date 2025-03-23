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

  private readonly fakeHellos = [
    {
      name: 'Hello world from Postman',
      helloId: '099e9830-9688-4d1e-af6b-94891a98e0b4',
      creationDate: '11/26/2023',
    },
    {
      name: 'Vai ter filme e pizza sexta?',
      helloId: 'ad1708fa-937b-4c9e-b220-d22525aa8bb4',
      creationDate: '2023-11-29',
    },
    {
      name: 'Hey there from Postman',
      helloId: 'cd3fa4df-67a0-40ee-99b4-5b7a27b6f142',
      creationDate: '11/26/2023',
    },
  ];

  async create(hello: Partial<Hello>) {
    const helloId = uuidv4();
    const newHello = {
      helloId,
      ...hello,
      creationDate: new Date().toLocaleDateString('en-ca'),
      active: false,
    } as Hello;
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
    snapshot.forEach((doc) => hellos.push(doc.data()));
    return hellos;
  }

  async findFake() {
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
