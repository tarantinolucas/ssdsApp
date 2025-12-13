const express = require("express");
const productoController = require("../controllers/producto.controller");

const router = express.Router();

router.post("/", productoController.crearProducto);
router.get("/", productoController.obtenerProductos);

module.exports = router;
