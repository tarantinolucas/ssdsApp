// Importanmos las dependencias necesarias
const express = require("express");
const app = express();

// Definimos enpoint
app.get("/", (req, res) => {
  res.send("API del SSDC funcionando!");
});

// Iniciamos el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
