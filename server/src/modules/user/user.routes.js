import express from 'express';
import { registerUser, getUsers, getUser } from './user.controller.js';

const router = express.Router();

router.route('/')
  .post(registerUser)
  .get(getUsers);

router.route('/:id')
  .get(getUser);

export default router;
