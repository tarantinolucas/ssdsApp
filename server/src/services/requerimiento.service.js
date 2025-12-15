const Requerimiento = require("../models/Requerimiento.model");
const Producto = require("../models/Producto.model");

const crearRequerimiento = async (reqData) => {
  const productoExiste = await Producto.findById(reqData.producto_id);

  if (!productoExiste) {
    throw { status: 404, message: "El producto especificado no existe." };
  }

  try {
    const nuevoRequerimiento = await Requerimiento.create(reqData);
    return nuevoRequerimiento;
  } catch (error) {
    console.error("Error en servicio crearRequerimiento:", error);
    throw error;
  }
};

const obtenerRequerimientos = async () => {
  try {
    const requerimientos = await Requerimiento.find()
      .lean()       
      .populate("producto_id", "nombre sku")
      .sort({ createdAt: -1 });

    return requerimientos;
  } catch (error) {
    console.error("Error en servicio obtenerRequerimientos:", error);
    throw error;
  }
};

module.exports = {
  crearRequerimiento,
  obtenerRequerimientos,
};
