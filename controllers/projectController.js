import Proyecto from '../models/Project.js';
import User from '../models/User.js';

const handlerObtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find({
    '$or' : [
      {'colaboradores': {$in: req.user}},
      {'creador': {$in: req.user}},
    ],
  })
  .select('-tareas');
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

  const proyecto = await Proyecto.findById(id)
  .populate('tareas')
  .populate('colaboradores', 'nombre email');

  if (!proyecto) {
    return res.status(404).json({
      msg: 'Proyecto no encontrado ⛔',
    });
  }
  if(proyecto.creador.toString() !== req.user._id.toString() &&
  !proyecto.colaboradores.some(colaborador => colaborador._id.toString() === req.user._id.toString())){
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

const buscarColaborador = async (req, res) => {
  const {email} = req.body;

  const usuario = await User.findOne({email}).select(
    '-password -confirmado -createdAt -updatedAt -token -__v');

  if (!usuario) {
    return res.status(404).json({
      msg: 'Usuario no encontrado ⛔',
    });
  }
  res.json(usuario);
}

const handlerAgregarColaborador = async (req, res) => {
  const proyecto = await Proyecto.findById(req.params.id);

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

  const {email} = req.body;

  const usuario = await User.findOne({email}).select(
    '-password -confirmado -createdAt -updatedAt -token -__v');

  if (!usuario) {
    return res.status(404).json({
      msg: 'Usuario no encontrado ⛔',
    });
  }

  // El colaborador no es el admin del proyecto
  if(proyecto.creador.toString() === usuario._id.toString()){
    return res.status(404).json({
      msg: 'El creador del Proyecto no puede ser colaborador ⛔',
    });
  }

  // Revisar que no este ya agreagdo al proyecto
  if(proyecto.colaboradores.includes(usuario._id)){
    return res.status(404).json({
      msg: 'El Usuario ya pertenece al Proyecto ⚠️',
    });
  }

  // Si no pertenece al proyecto, se puede agregar
  proyecto.colaboradores.push(usuario._id);
  await proyecto.save();

  res.json({ msg: 'Colaborador Agregado al Proyecto , Correctamente ✅' });
}

const handlerEliminarColaborador = async (req, res) => {
  const proyecto = await Proyecto.findById(req.params.id);

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
// Si no pertenece al proyecto, se puede Eliminar
  proyecto.colaboradores.pull(req.body.id);
  await proyecto.save();
  res.json({ msg: 'Colaborador Eliminado Correctamente ✅' });
}

export {
  handlerObtenerProyectos,
  handlerNuevoProyecto,
  handlesObtenerProyecto,
  handlerEditarProyecto,
  handlerEliminarProyecto,
  buscarColaborador,
  handlerAgregarColaborador,
  handlerEliminarColaborador,
}
