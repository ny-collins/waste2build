import express from 'express';
import { createListing, getListings, getListingById, acceptListing } from '../controllers/listings.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Public Read Access
router.get('/', getListings);
router.get('/:id', getListingById);

// Protected Write Access
router.post('/', requireAuth, requireRole('seller'), upload.array('photos', 6), createListing);
router.post('/:id/accept', requireAuth, requireRole('recycler'), acceptListing);

export default router;
