import { Router } from 'express';
import { validateRequest } from '../../middlewares';

const router = Router();

router.get('/');
router.get('/:id', validateRequest({
	params: 
}));
router.post('/');
router.put('/:id');
router.delete('/:id');

export default router;
