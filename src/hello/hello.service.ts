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
    const newHello = new Hello({
      helloId: uuidv4(),
      ...hello,
      creationDate: new Date().toLocaleDateString('en-ca'),
      active: false,
    });
    const result = await this.helloCollection
      .doc(newHello.helloId)
      .set(newHello);
    console.log('create');
    console.log(result);
    return result;
  }

  async findOne(id: string) {
    const hello = await this.helloCollection.doc(id).get();
    if (!hello) {
      throw new NotFoundException('hello not found');
    }
    console.log('findOne');
    console.log(hello);
    return hello;
  }

  async find() {
    const snapshot = await this.helloCollection.get();
    console.log('find');
    console.log(snapshot[0]);
    const hellos: Hello[] = [];
    snapshot.forEach((doc) => hellos.push(doc.data()));
    console.log(hellos);
    return hellos;
  }

  async update(id: string, attrs: Partial<Hello>) {
    const hello = await this.findOne(id);
    if (!hello) {
      throw new NotFoundException('hello not found');
    }
    Object.assign(hello, attrs);
    const result = await this.helloCollection
      .doc(id)
      .update(instanceToPlain(hello));
    console.log('update');
    console.log(result);
    return result;
  }

  async remove(id: string) {
    const hello = await this.findOne(id);
    if (!hello) {
      throw new NotFoundException('hello not found');
    }
    const result = await this.helloCollection.doc(id).delete();
    console.log('remove');
    console.log(result);
    return result;
  }
}
