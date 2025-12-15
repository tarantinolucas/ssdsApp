const Requerimiento = require("../models/Requerimiento.model");
const Producto = require("../models/Producto.model");

// Creacion de un nuevo requerimiento
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

// Obtener todos los requerimientos con detalles del producto
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

// Agregar una cotización a un requerimiento existente
const agregarCotizacion = async (idRequerimiento, datosCotizacion) => {
  const requerimiento = await Requerimiento.findById(idRequerimiento);

  if (!requerimiento) {
    throw { status: 404, message: "Requerimiento no encontrado" };
  }

  const cantidad = Number(datosCotizacion.cantidadCotizada);
  const precio = Number(datosCotizacion.precioUnitario);
  const descuentoPorcentaje = Number(datosCotizacion.porcentajeDescuento) || 0;
  const alicuotaIVA = Number(datosCotizacion.alicuotaIVA);

  const precioBase = cantidad * precio;
  const montoDescuento = precioBase * (descuentoPorcentaje / 100);

  const subtotal = precioBase - montoDescuento;

  const montoIVA = subtotal * (alicuotaIVA / 100);

  const total = subtotal + montoIVA;

  const nuevaCotizacion = {
    ...datosCotizacion,
    montoDescuentoTotal: montoDescuento,
    subtotal: subtotal,
    montoIVA: montoIVA,
    total: total,
  };

  requerimiento.cotizaciones.push(nuevaCotizacion);

  await requerimiento.save();

  return requerimiento;
};

// Exportamos las funciones
module.exports = {
  crearRequerimiento,
  obtenerRequerimientos,
  agregarCotizacion,
};
