import { Response, Request, NextFunction } from 'express';
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
}

export default PizzaHandler;
