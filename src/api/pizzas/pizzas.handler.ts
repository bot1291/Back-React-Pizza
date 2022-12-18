import { Response, Request, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { Pizzas, PizzasWithId } from './pizzas.model';

class PizzaHandler {
	public static async getAll(
		_req: Request,
		res: Response<PizzasWithId[]>,
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
		req: Request<ParamsWithId, PizzasWithId, {}>,
		res: Response<PizzasWithId>,
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
}

export default PizzaHandler;
