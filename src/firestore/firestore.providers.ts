import { HelloEntity } from "src/hello/hello.entity";

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions';
export const FirestoreCollectionProviders: string[] = [HelloEntity.collectionName];
