import { Router } from 'express';
import userRouter from '../resources/users/routes';
import stripeWebHookRouter from '../resources/stripe/webhooks/routes';
// import protectedRoute from '../resources/protected/routes';

const router: Router = Router();

// Higher level routes definition
router.use('/users', userRouter); // v1/users
router.use('/stripe/webhooks', stripeWebHookRouter);
// router.use('/protected', protectedRoute);
// /v1/stripe/webhooks

export default router;
