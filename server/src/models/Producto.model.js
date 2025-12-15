// Importamos librerías necesarias
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definimos el esquema del producto
const ProductoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    sku: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    ultimoPrecioUnitario: {
      type: Number,
      default: 0,
    },
    monedaUltimaCompra: {
      type: String,
      enum: ["ARS", "USD", "USD_BLUE"],
      default: "ARS",
    },
    fechaUltimaCompra: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Exportamos el modelo
module.exports = mongoose.model("Producto", ProductoSchema);
