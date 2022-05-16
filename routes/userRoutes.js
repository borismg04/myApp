import express from 'express';
import { handlerRegisterUser,handlerAuthenticateUser } from '../controllers/userController.js';
const router = express.Router();

router.post('/',handlerRegisterUser);
router.post('/login',handlerAuthenticateUser);


export default router;
