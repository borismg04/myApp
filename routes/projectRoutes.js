import express from 'express';
import {
  handlerObtenerProyectos,
  handlerNuevoProyecto,
  handlesObtenerProyecto,
  handlerEditaarProyecto,
  handlerEliminarProyecto,
  handlerAgregarColaborador,
  handlerEliminarColaborador,
  handlerAgregarTarea
} from '../controllers/projectController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.get('/',checkAuth,handlerObtenerProyectos);
router.post('/',checkAuth,handlerNuevoProyecto);
router.get('/:id',checkAuth,handlesObtenerProyecto);
router.put('/:id',checkAuth,handlerEditaarProyecto);
router.delete('/:id',checkAuth,handlerEliminarProyecto);

router.post('/tareas/:id',checkAuth,handlerAgregarTarea);

router.post('/agregar-colaborador/:id',checkAuth,handlerAgregarColaborador);
router.post('/eliminar-colaborador/:id',checkAuth,handlerEliminarColaborador);


export default router;
