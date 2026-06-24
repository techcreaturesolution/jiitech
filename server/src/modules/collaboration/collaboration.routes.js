import express from 'express';
import { createCollaboration, getCollaborations, updateCollaboration, deleteCollaboration } from './collaboration.controller.js';
import upload from '../../middleware/upload.middleware.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(getCollaborations)
  // Collaboration only uses a single image
  .post(protect, upload.single('image'), createCollaboration);

router.route('/:id')
  .put(protect, upload.single('image'), updateCollaboration)
  .delete(protect, deleteCollaboration);

export default router;
