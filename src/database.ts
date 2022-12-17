import { MongoClient } from 'mongodb';

const MONGO_URL =
	process.env.MONGO_URL ??
	'mongodb+srv://admin:admin@cluster0.equlthr.mongodb.net/?retryWrites=true&w=majority';

export const client = new MongoClient(MONGO_URL);
export const database = client.db('pizzasData');
