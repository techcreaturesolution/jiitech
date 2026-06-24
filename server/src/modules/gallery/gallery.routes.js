import express from 'express';
import { createGallery, getGalleries, updateGallery, deleteGallery } from './gallery.controller.js';
import upload from '../../middleware/upload.middleware.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(getGalleries)
  .post(protect, upload.array('images', 20), createGallery);

router.route('/:id')
  .put(protect, upload.array('images', 20), updateGallery)
  .delete(protect, deleteGallery);

export default router;
