const moongose = require('mongoose');

const URL = process.env.URL;

async function connectDB() {
  try {
    await moongose.connect(URL)
    console.log('MongoDB Connected...');
  } catch (error) {
    console.log(`Error al conectar a la base de datos: ${error}`);
    process.exit(1);
  }
}

module.exports = connectDB;
