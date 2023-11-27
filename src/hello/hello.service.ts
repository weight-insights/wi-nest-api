import { CollectionReference } from '@google-cloud/firestore';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Hello } from './hello.entity';
import { CreateHelloDto } from './dtos/create-hello.dto';
import { v4 as uuidv4 } from 'uuid';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class HelloService {
  constructor(
    @Inject(Hello.collectionName)
    private helloCollection: CollectionReference<Hello>,
  ) {}

  async create(hello: CreateHelloDto) {
    const helloId = uuidv4();
    const newHello = {
      helloId,
      ...hello,
      creationDate: new Date().toLocaleDateString('en-ca'),
      active: false,
    };
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

  async update(id: string, attrs: Partial<Hello>) {
    const oldHello = await this.findOne(id);
    if (!oldHello) {
      throw new NotFoundException('hello not found');
    }
    const updatedHello = instanceToPlain(Object.assign(oldHello, attrs));
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
