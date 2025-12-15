const requerimientoService = require("../services/requerimiento.service");

const crearRequerimiento = async (req, res) => {
  try {
    const data = req.body;

    if (!data.producto_id || !data.cantidadObjetivo) {
      return res.status(400).json({
        mensaje: "Faltan datos obligatorios: producto_id y cantidadObjetivo",
      });
    }

    const nuevoReq = await requerimientoService.crearRequerimiento(data);

    return res.status(201).json({
      mensaje: "Requerimiento creado",
      data: nuevoReq,
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ mensaje: error.message });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        mensaje: "Error de validación",
        errores: error.message,
      });
    }

    console.error(error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

const obtenerRequerimientos = async (req, res) => {
  try {
    const requerimientos = await requerimientoService.obtenerRequerimientos();
    return res.status(200).json({ data: requerimientos });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al obtener requerimientos" });
  }
};

module.exports = { crearRequerimiento, obtenerRequerimientos };
