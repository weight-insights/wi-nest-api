import { CollectionReference } from '@google-cloud/firestore';
import { Inject, Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { HelloEntity } from './hello.entity';

@Injectable()
export class HelloService {
  constructor(
    // private configService: ConfigService,
    @Inject(HelloEntity.collectionName) private helloCollection: CollectionReference<HelloEntity>,
  ) {}

  async find() {
    console.log('pqp');
    // return { message: this.configService.get<string>('HELLO_WORLD') };
    const snapshot = await this.helloCollection.get();
    const games: HelloEntity[] = [];
    snapshot.forEach((doc) => games.push(doc.data()));
    return games;
  }
}
