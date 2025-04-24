import { CollectionReference } from '@google-cloud/firestore';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Hello } from './hello.entity';
import { HelloDto } from './hello.dto';

@Injectable()
export class HelloService {
  constructor(
    @Inject(Hello.collectionName)
    private helloCollection: CollectionReference<Hello>,
  ) {}

  async create(message: string): Promise<HelloDto> {
    const creationDate = new Date().toLocaleDateString('en-ca');
    const newHello = { message, creationDate } as Hello;
    const res = await this.helloCollection.add(newHello);
    const helloDto: HelloDto = { ...newHello, helloId: res.id } as HelloDto;
    return helloDto;
  }

  async findOne(id: string) {
    const doc = await this.helloCollection.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException('hello not found');
    }
    const helloDto: HelloDto = this.parseHelloEntityToDto(doc);
    return helloDto;
  }

  async find() {
    const snapshot = await this.helloCollection.get();
    const hellos: HelloDto[] = [];
    snapshot.forEach((doc) => hellos.push(this.parseHelloEntityToDto(doc)));
    return hellos;
  }

  async update(id: string, attrs: Partial<Hello>) {
    const oldHello = await this.findOne(id);
    if (!oldHello) {
      throw new NotFoundException('hello not found');
    }
    const updatedHello = { ...oldHello, ...attrs } as HelloDto;
    await this.helloCollection.doc(id).update(attrs);
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

  private parseHelloEntityToDto(doc: { id: string; data: () => Hello; }): HelloDto {
    const docData = doc.data();
    const helloDto: HelloDto = {
      helloId: doc.id,
      message: docData.message,
      creationDate: docData.creationDate
    } as HelloDto;
    return helloDto;
  }
}
