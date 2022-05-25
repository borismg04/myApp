import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  estado: {
    type: Boolean,
    default: false,
  },
  fechaEntrega: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  prioridad: {
    type: String,
    required: true,
    enum:[ 'Alta', 'Media', 'Baja' ],
  },
  proyecto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  completado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
