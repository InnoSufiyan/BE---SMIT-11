import express from 'express';
import { forgotPasswordEmail, login, resetPasswordEmail, signUp, verifyEmail } from '../controller/authController.js';
import { VerifyToken, validateToken } from '../helpers/token.js';

export const authRoutes = express.Router();

authRoutes.post('/signup', signUp);
authRoutes.post('/login', login);
authRoutes.post('/verifyEmail', validateToken, verifyEmail);
authRoutes.post('/forgotPassword', forgotPasswordEmail);
authRoutes.put('/resetPassword', resetPasswordEmail);