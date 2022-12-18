import { Response, Request, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { Pizza, Pizzas, PizzaWithId } from './pizzas.model';

class PizzaHandler {
	public static async getAll(
		_req: Request,
		res: Response<PizzaWithId[]>,
		next: NextFunction
	): Promise<void> {
		try {
			const result = await Pizzas.find().toArray();
			res.json(result);
		} catch (error) {
			next(error);
		}
	}

	public static async getOne(
		req: Request<ParamsWithId, PizzaWithId, {}>,
		res: Response<PizzaWithId>,
		next: NextFunction
	): Promise<void> {
		try {
			const result = await Pizzas.findOne({
				_id: new ObjectId(req.params.id),
			});
			if (!result) {
				res.status(404);
				throw new Error(`Pizzas with id ${req.params.id} not found`);
			}
			res.json(result);
		} catch (error) {
			next(error);
		}
	}

	public static async createOne(
		req: Request<{}, PizzaWithId, Pizza>,
		res: Response<PizzaWithId>,
		next: NextFunction
	): Promise<void> {
		try {
			const result = await Pizzas.insertOne(req.body);
			if (!result.insertedId) {
				throw new Error('Error inserting pizza');
			}
			res.status(201);
			res.json({
				...req.body,
				_id: result.insertedId,
			});
		} catch (error) {
			next(error);
		}
	}

	public static async updateOne(
		req: Request<ParamsWithId, PizzaWithId, PizzaWithId>,
		res: Response<PizzaWithId>,
		next: NextFunction
	): Promise<void> {
		try {
			const result = await Pizzas.findOneAndUpdate(
				{
					_id: new ObjectId(req.params.id),
				},
				{
					$set: req.body,
				},
				{
					returnDocument: 'after',
				}
			);
			if (!result.value) {
				res.status(404);
				throw new Error(`Pizza with id ${req.params.id} not found`);
			}
			res.json(result.value);
		} catch (error) {
			next(error);
		}
	}
}

export default PizzaHandler;
