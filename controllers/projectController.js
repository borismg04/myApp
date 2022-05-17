import Proyecto from '../models/Project.js';


const handlerObtenerProyectos = async (req, res) => {

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

}

const handlerEditaarProyecto= async (req, res) => {

}

const handlerEliminarProyecto = async (req, res) => {

}

const handlerAgregarColaborador = async (req, res) => {

}

const handlerEliminarColaborador = async (req, res) => {

}

const handlerAgregarTarea = async (req, res) => {

}

export {
  handlerObtenerProyectos,
  handlerNuevoProyecto,
  handlesObtenerProyecto,
  handlerEditaarProyecto,
  handlerEliminarProyecto,
  handlerAgregarColaborador,
  handlerEliminarColaborador,
  handlerAgregarTarea
}
