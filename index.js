import dotenv from 'dotenv';
import express from 'express';
import conectarDB from './config/database.js';


const app = express();

dotenv.config();

conectarDB();

// ROUTING
app.get('/', (req, res) => {
    res.send('Hello World');
});


// Conexion a la base de datos
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running 🚀 at http://localhost:${PORT}🚀/`);
})
