import { Router } from 'express';
import webhooksController from './controller';
import express from 'express';

const router = Router();

router.route('/').post(express.raw({ type: 'application/json' }), webhooksController.receiveUpdates);

export default router;
