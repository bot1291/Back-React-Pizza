import { Router, Response, Request } from 'express';
import pizzas from './pizzas/pizzas.routes';
import MessageResponse from '../interfaces/MessageResponse';

const router = Router();

router.get('/', (req: Request, res: Response<MessageResponse>) => {
	res.json({
		message: 'Api route',
	});
});

router.use('/pizzas', pizzas);

export default router;
