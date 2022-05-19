import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import conectarDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';


const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

// Configurar CORS
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)){
      // Consulta API
      callback(null, true);
    } else {
      // No esta permitido el acceso
      callback(new Error('Error de CORS'));
    }
  }
};

app.use(cors(corsOptions));


// ROUTING
app.use('/api/users', userRoutes);
app.use('/api/proyectos', projectRoutes);
app.use('/api/tareas', taskRoutes);

// Conexion a la base de datos
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running 🚀 at http://localhost:${PORT}🚀/`);
})
