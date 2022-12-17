import { WithId } from 'mongodb';
import * as z from 'zod';
import { database } from '../../database';

export const SizeAndPrice = z.object({
	size: z.string(),
	price: z.number(),
});

export const Pizza = z.object({
	currentPrice: z.number(),
	image: z.string(),
	title: z.string(),
	rating: z.number().max(1),
	types: z.string().array(),
	possibleDoughs: z.string().array(),
	sizesAndPrices: SizeAndPrice.array(),
});

export type Pizza = z.infer<typeof Pizza>;
export type PizzasWithId = WithId<Pizza>;
export const Pizzas = database.collection<Pizza>('pizzas');
