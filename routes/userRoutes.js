import express from 'express';
import { handlerRegisterUser } from '../controllers/userController.js';
const router = express.Router();

router.post('/',handlerRegisterUser);


export default router;
