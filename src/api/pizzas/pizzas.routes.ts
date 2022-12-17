import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import { Pizza } from './pizzas.model';

const router = Router();

router.get('/');
router.get(
	'/:id',
	validateRequest({
		params: Pizza,
	})
);
router.post('/');
router.put(
	'/:id',
	validateRequest({
		params: Pizza,
	})
);
router.delete(
	'/:id',
	validateRequest({
		params: Pizza,
	})
);

export default router;
