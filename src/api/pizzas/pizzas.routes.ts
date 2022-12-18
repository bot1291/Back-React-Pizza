import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import PizzaHandler from './pizzas.handler';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

const router = Router();

router.get('/', PizzaHandler.getAll);
router.get(
	'/:id',
	validateRequest({
		params: ParamsWithId,
	}),
	PizzaHandler.getOne
);
router.post('/');
router.put(
	'/:id',
	validateRequest({
		params: ParamsWithId,
	})
);
router.delete(
	'/:id',
	validateRequest({
		params: ParamsWithId,
	})
);

export default router;
