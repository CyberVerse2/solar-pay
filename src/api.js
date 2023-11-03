import { Router } from 'express';
import authRouter from './modules/auth/auth.router.js'
const api = Router();

api.use('/auth', authRouter);
// api.use('/user', userRouter);
// api.use('/campaign', campaignRouter);
// api.use('/referrals', referralsRouter);
// api.use('/dashboard', dashboardRouter);

export default api;
