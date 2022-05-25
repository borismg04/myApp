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
    // Almacenar el ID del proyecto en la tarea
    existeProyecto.tareas.push(nuevaTarea._id);
    await existeProyecto.save();
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

  tarea.nombre = req.body.nombre || tarea.nombre;
  tarea.descripcion = req.body.descripcion || tarea.descripcion;
  tarea.prioridad = req.body.prioridad || tarea.prioridad;
  tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;

  try{
    const nuevaTarea = await tarea.save();
    res.json(nuevaTarea)
  }catch(error){
    console.log(error);
  }
}

const handlerEliminarTarea = async (req, res) => {
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

  try{

    const proyecto = await Proyecto.findById(tarea.proyecto);
    proyecto.tareas.pull(tarea._id);

    await Promise.allSettled([await proyecto.save(),await tarea.deleteOne()])

    res.json({
      msg: 'Tarea Eliminada ✅'
    })
  }
  catch(error){
    console.log(error);
  }

}

const handlerCambiarEstadoTarea = async (req, res) => {
  const { id } = req.params;
  const tarea = await Tarea.findById(id).populate('proyecto');

  if (!tarea) {
    const error = new Error('Tarea no existe ⛔');
    return res.status(404).json({
      msg: error.message,
    });
  }

  if (tarea.proyecto.creador.toString() !== req.user._id.toString() &&
      !tarea.proyecto.colaboradores.some(
        (colaborador) => colaborador._id.toString() === req.user._id.toString()
      )) {
    const error = new Error('No tienes permisos para ver esta tarea ⛔');
    return res.status(403).json({
    msg: error.message,
  });
  }

  tarea.estado = !tarea.estado;
  await tarea.save();
  res.json(tarea);
}

export {
  handlerAgregarTareas,
  handlerObtenerTarea,
  handlerEditarTarea,
  handlerEliminarTarea,
  handlerCambiarEstadoTarea,
}

