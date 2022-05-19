import express from 'express';
import {
  handlerObtenerProyectos,
  handlerNuevoProyecto,
  handlesObtenerProyecto,
  handlerEditarProyecto,
  handlerEliminarProyecto,
  // handlerAgregarColaborador,
  // handlerEliminarColaborador,
  // handlerObtenerTarea
} from '../controllers/projectController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.get('/',checkAuth,handlerObtenerProyectos);
router.post('/',checkAuth,handlerNuevoProyecto);
router.get('/:id',checkAuth,handlesObtenerProyecto);
router.put('/:id',checkAuth,handlerEditarProyecto);
router.delete('/:id',checkAuth,handlerEliminarProyecto);

// router.post('/agregar-colaborador/:id',checkAuth,handlerAgregarColaborador);
// router.post('/eliminar-colaborador/:id',checkAuth,handlerEliminarColaborador);

// router.get('/tareas/:id',checkAuth,handlerObtenerTarea);

export default router;
