import Proyecto from '../models/Project.js';
// import Tarea from '../models/Task.js';

const handlerObtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find().where('creador').equals(req.user);
  res.json(proyectos);

}

const handlerNuevoProyecto= async (req, res) => {
  const proyectos = await Proyecto(req.body);
  proyectos.creador = req.user._id;

  try {
    const nuevoProyecto = await proyectos.save();
    res.json(nuevoProyecto);
  } catch (error) {
    console.log(error);
  }
}

const handlesObtenerProyecto = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const proyecto = await Proyecto.findById(id);

  if (!proyecto) {
    return res.status(404).json({
      msg: 'Proyecto no encontrado ⛔',
    });
  }
  if(proyecto.creador.toString() !== req.user._id.toString()){
    return res.status(401).json({
    msg:   'No esta Autorizado ⛔',
  });
  }

  res.json(proyecto);
}

const handlerEditarProyecto= async (req, res) => {
  const { id } = req.params;

  const proyecto = await Proyecto.findById(id);

  if (!proyecto) {
    return res.status(404).json({
      msg: 'Proyecto no encontrado ⛔',
    });
  }
  if(proyecto.creador.toString() !== req.user._id.toString()){
    return res.status(401).json({
      msg: 'No esta Autorizado ⛔',
  });
  }
  proyecto.nombre = req.body.nombre || proyecto.nombre;
  proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
  proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
  proyecto.cliente = req.body.cliente || proyecto.cliente;

  try {
    const nuevoProyecto = await proyecto.save();
    res.json(nuevoProyecto);
  }
  catch (error) {
    console.log(error);
  }
}

const handlerEliminarProyecto = async (req, res) => {
  const { id } = req.params;

  const proyecto = await Proyecto.findById(id);

  if (!proyecto) {
    return res.status(404).json({
      msg: 'Proyecto no encontrado ⛔',
    });
  }
  if(proyecto.creador.toString() !== req.user._id.toString()){
      return res.status(401).json({
        msg: 'No esta Autorizado ⛔',
    });
  }
  try {
    await proyecto.deleteOne();
    res.json({
      msg: 'Proyecto eliminado ✅',
      });
  } catch (error) {
    console.log(error);
  }
}

// const handlerAgregarColaborador = async (req, res) => {

// }

// const handlerEliminarColaborador = async (req, res) => {

// }

// const handlerObtenerTarea = async (req, res) => {
//   const { id } = req.params;

//   const existeProyecto = await Proyecto.findById(id);

//   if (!existeProyecto) {
//     const error = new Error('Proyecto no encontrado ⛔');
//     return res.status(404).json({
//       msg: error.message,
//     });
//   }
//   // Aqui se tiene que verificar que el usuario sea el creador del proyecto o el colaborador

//   const tareas = await Tarea.find().where('proyecto').equals(id);

//   res.json(tareas);

// }

export {
  handlerObtenerProyectos,
  handlerNuevoProyecto,
  handlesObtenerProyecto,
  handlerEditarProyecto,
  handlerEliminarProyecto,
  // handlerAgregarColaborador,
  // handlerEliminarColaborador,
  // handlerObtenerTarea,
}
