const ProductoService = require("../services/producto.service");

const crearProducto = async (req, res) => {
  const productoData = req.body;

  // Validación básica de entrada
  if (!productoData.nombre || !productoData.sku) {
    return res.status(400).json({ mensaje: "Nombre y SKU son obligatorios." });
  }

  try {
    // Llamamos al servicio para crear el producto
    const nuevoProducto = await ProductoService.crearProducto(productoData);
    // Devolvemos una respuesta exitosa
    return res.status(201).json({
      mensaje: "Producto creado exitosamente.",
      data: nuevoProducto,
    });
  } catch (error) {
    // Manejo de errores de Mongoose
    if (error.code == 11000) {
      return res.status(409).json({
        mensaje: "El SKU o el nombre del producto ya existen.",
        campo: Object.keys(error.keyValue)[0],
      });
    }
    // Error genérico del servidor
    return res
      .status(500)
      .json({ mensaje: "Error interno del servidor al crear producto." });
  }
};

const obtenerProductos = async (req, res) => {
  try {
    const productos = await ProductoService.obtenerProductos();
    return res.status(200).json({ data: productos });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al obtener productos." });
  }
};

module.exports = {
  crearProducto,
  obtenerProductos,
};
