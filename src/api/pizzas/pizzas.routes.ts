import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import PizzaHandler from './pizzas.handler';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { Pizza } from './pizzas.model';

const router = Router();

router.get('/', PizzaHandler.getAll);
router.get(
	'/:id',
	validateRequest({
		params: ParamsWithId,
	}),
	PizzaHandler.getOne
);
router.post(
	'/',
	validateRequest({
		body: Pizza,
	}),
	PizzaHandler.createOne
);
router.put(
	'/:id',
	validateRequest({
		params: ParamsWithId,
		body: Pizza,
	}),
	PizzaHandler.updateOne
);
router.delete(
	'/:id',
	validateRequest({
		params: ParamsWithId,
	}),
	PizzaHandler.deleteOne
);

export default router;
