import express from 'express';
import { addUser, getUser, getUsers } from '../controller/userController.js';

export const usersRoutes = express.Router();

usersRoutes.get('/', getUsers);
usersRoutes.post('/', addUser);
usersRoutes.get('/:id', getUser);