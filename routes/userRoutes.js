import express from 'express';
import {
  handlerRegisterUser,
  handlerAuthenticateUser,
  handlerConfirmUser,
  handlerForgotPassword,
  handlerCheckToken,
} from '../controllers/userController.js';
const router = express.Router();

router.post('/',handlerRegisterUser);
router.post('/login',handlerAuthenticateUser);
router.get('/confirmar/:token',handlerConfirmUser);
router.post("/olvide-password",handlerForgotPassword);
router.get("/olvide-password/:token", handlerCheckToken);


export default router;
