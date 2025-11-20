import { Router } from 'express';
import webhooksController from './controller';
import { raw } from 'express';

const router = Router();

router.route('/').post(raw({ type: 'application/json' }), webhooksController.receiveUpdates);

export default router;
