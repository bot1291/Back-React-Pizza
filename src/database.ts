import { MongoClient } from 'mongodb';

const MONGO_URL = process.env.MONGO_URL;

export const client = new MongoClient(MONGO_URL ?? '123');
export const database = client.db('testData');
