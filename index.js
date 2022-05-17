import dotenv from 'dotenv';
import express from 'express';
import conectarDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';


const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

// ROUTING
app.use('/api/users', userRoutes);
app.use('/api/proyectos', projectRoutes);


// Conexion a la base de datos
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running 🚀 at http://localhost:${PORT}🚀/`);
})
