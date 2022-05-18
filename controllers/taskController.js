import Proyecto from '../models/Project.js';
import Tarea from '../models/Task.js';

const handlerAgregarTareas = async (req, res) => {
  const { proyecto } = req.body;

  const existeProyecto = await Proyecto.findById(proyecto);

  console.log(existeProyecto);

  if (!existeProyecto) {
    const error = new Error('Proyecto no existe ⛔');
    return res.status(404).json({
      msg: error.message,
    });
  }
  if(existeProyecto.creador.toString() !== req.user._id.toString()){
    const error = new Error('No tienes permisos para crear tareas en este proyecto ⛔');
    return res.status(403).json({
      msg: error.message,
    });
  }

  try{
    const  nuevaTarea = await Tarea.create(req.body);
    res.json(nuevaTarea)
  }catch(error){
    console.log(error);
  }
};

const handlerObtenerTarea = async (req, res) => {
  const { id } = req.params;
  const tarea = await Tarea.findById(id).populate('proyecto');

  if (!tarea) {
    const error = new Error('Tarea no existe ⛔');
    return res.status(404).json({
      msg: error.message,
    });
  }

  if (tarea.proyecto.creador.toString() !== req.user._id.toString()) {
    const error = new Error('No tienes permisos para ver esta tarea ⛔');
    return res.status(403).json({
    msg: error.message,
  });
  }
  res.json(tarea);
}

const handlerEditarTarea = async (req, res) => {

}

const handlerEliminarTarea = async (req, res) => {

}

const handlerCambiarEstadoTarea = async (req, res) => {

}

export {
  handlerAgregarTareas,
  handlerObtenerTarea,
  handlerEditarTarea,
  handlerEliminarTarea,
  handlerCambiarEstadoTarea,
}

