import { WithId } from 'mongodb';
import * as z from 'zod';
import { database } from '../../database';

const collection = process.env.NODE_ENV !== 'test' ? 'pizzas' : 'test';

export const SizeAndPrice = z.object({
	size: z.string(),
	price: z.number(),
});

export const Pizza = z.object({
	currentPrice: z.number().default(0),
	image: z.string().url(),
	title: z.string(),
	rating: z
		.number()
		.gte(0, { message: 'Rating must be more or equal 0' })
		.lte(5, { message: 'Rating must be lower or equal 5' })
		.default(0),
	types: z
		.string()
		.array()
		.min(1, { message: 'Types must have at least 1 type' }),
	possibleDoughs: z
		.string()
		.array()
		.min(1, { message: 'Possible doughs must have at least 1 dough' })
		.default(['тонкое', 'традиционное']),
	sizesAndPrices: SizeAndPrice.array()
		.min(1, {
			message:
				'Size and price must have at least 1 dependency between each other',
		})
		.default([
			{
				size: '26',
				price: 0,
			},
		]),
});

export type Pizza = z.infer<typeof Pizza>;
export type PizzaWithId = WithId<Pizza>;
export const Pizzas = database.collection<Pizza>(collection);
