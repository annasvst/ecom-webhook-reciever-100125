import { Router } from 'express';
import userRouter from '../resources/users/routes';
// import protectedRoute from '../resources/protected/routes';

const router: Router = Router();

// Higher level routes definition
router.use('/users', userRouter); // v1/users
// router.use('/protected', protectedRoute);

export default router;
