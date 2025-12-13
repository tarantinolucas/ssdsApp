const Producto = require("../models/Producto.model");

const crearProducto = async (productoData) => {
  try {
    const nuevoProducto = await Producto.create(productoData);
    return nuevoProducto;
  } catch (error) {
    console.error("Error en el servicio al crear producto:", error);
    throw error;
  }
};

const obtenerProductos = async () => {
  try {
    const productos = await Producto.find();
    return productos;
  } catch (error) {
    console.error("Error en el servicio al obtener productos:", error);
    throw error;
  }
};

module.exports = {
  crearProducto,
  obtenerProductos,
};
