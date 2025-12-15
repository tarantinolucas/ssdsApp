const express = require("express");
const router = express.Router();
const requerimientoController = require("../controllers/requerimiento.controller");

router.post("/", requerimientoController.crearRequerimiento);
router.get("/", requerimientoController.obtenerRequerimientos);

module.exports = router;
