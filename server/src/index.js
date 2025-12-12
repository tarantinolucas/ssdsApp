// Importanmos las dependencias necesarias
require("dotenv").config();

const express = require("express");

const connectDB = require("../config/db.config.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Conectamos a la base de datos
connectDB();

app.use(express.json());

// Definimos enpoint
app.get("/", (req, res) => {
  res.send("API del SSDC funcionando!");
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
