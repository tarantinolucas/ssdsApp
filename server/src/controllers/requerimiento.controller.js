const requerimientoService = require("../services/requerimiento.service");

// Controlador para crear un nuevo requerimiento
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

// Controlador para obtener todos los requerimientos
const obtenerRequerimientos = async (req, res) => {
  try {
    const requerimientos = await requerimientoService.obtenerRequerimientos();
    return res.status(200).json({ data: requerimientos });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al obtener requerimientos" });
  }
};

// Controlador para agregar una cotización a un requerimiento
const agregarCotizacion = async (req, res) => {
  try {
    const { id } = req.params;
    const datosCotizacion = req.body;

    const requerimientoActualizado =
      await requerimientoService.agregarCotizacion(id, datosCotizacion);

    return res.status(200).json({
      mensaje: "Cotización agregada exitosamente",
      data: requerimientoActualizado,
    });
  } catch (error) {
    if (error.status)
      return res.status(error.status).json({ mensaje: error.message });
    if (error.name === "ValidationError")
      return res
        .status(400)
        .json({ mensaje: "Error de validación", errores: error.message });

    console.error(error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// Exportamos los controladores
module.exports = {
  crearRequerimiento,
  obtenerRequerimientos,
  agregarCotizacion,
};
