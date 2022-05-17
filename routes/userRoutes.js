import express from 'express';
import {
  handlerRegisterUser,
  handlerAuthenticateUser,
  handlerConfirmUser,
  handlerForgotPassword,
  handlerCheckToken,
  handlerChangePassword,
  perfil,
} from '../controllers/userController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.post('/',handlerRegisterUser);
router.post('/login',handlerAuthenticateUser);
router.get('/confirmar/:token',handlerConfirmUser);
router.post('/olvide-password',handlerForgotPassword);
router.get("/olvide-password/:token", handlerCheckToken);
router.post("/olvide-password/:token", handlerChangePassword);

router.get('/perfil',checkAuth,perfil);


export default router;
