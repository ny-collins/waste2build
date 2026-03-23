import express from 'express';
import { getMyRewards, getAvailableCoupons, redeemCoupon } from '../controllers/rewards.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.use(requireAuth);
router.use(requireRole('seller'));

router.get('/me', getMyRewards);
router.get('/catalog', getAvailableCoupons);
router.post('/redeem', redeemCoupon);

export default router;
