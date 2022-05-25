import express from 'express';
import {
  handlerAgregarTareas,
  handlerObtenerTarea,
  handlerEditarTarea,
  handlerEliminarTarea,
  handlerCambiarEstadoTarea,
} from '../controllers/taskController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.post('/',checkAuth,handlerAgregarTareas);
router.get('/:id',checkAuth,handlerObtenerTarea);
router.put('/:id',checkAuth,handlerEditarTarea);
router.delete('/:id',checkAuth,handlerEliminarTarea);

router.post('/estado/:id',checkAuth,handlerCambiarEstadoTarea);


export default router;
