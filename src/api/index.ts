import { Router, Response, Request } from 'express';
import MessageResponse from '../interfaces/MessageResponse';

const router = Router();

router.get('/', (req: Request, res: Response<MessageResponse>) => {
	res.json({
		message: 'Api route',
	});
});

export default router;
