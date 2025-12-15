// Importanmos las dependencias necesarias
require("dotenv").config();

const express = require("express");

const connectDB = require("../config/db.config.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Importamos rutas
const productoRoutes = require("./routes/producto.routes.js");
const requerimientoRoutes = require("./routes/requerimiento.routes.js");

// Usamos las rutas
app.use("/api/productos", productoRoutes);
app.use("/api/requerimiento", requerimientoRoutes);

// Conectamos a la base de datos
connectDB();

// Definimos enpoint
app.get("/", (req, res) => {
  res.send("API del SSDC funcionando!");
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
