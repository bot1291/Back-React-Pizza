import { MongoClient } from 'mongodb';

const MONGO_URL =
	process.env.MONGO_URL ??
	'mongodb+srv://admin:admin@cluster0.equlthr.mongodb.net/?retryWrites=true&w=majority';

export const client = new MongoClient(MONGO_URL ?? '123');
export const database = client.db('testData');
