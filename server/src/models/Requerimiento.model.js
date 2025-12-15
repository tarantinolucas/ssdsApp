// Importamos librerías necesarias
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definimos el sub-documento Cotización
// Representa la oferta específica de un proveedor para una cantidad
const CotizacionSchema = new Schema({
  // Cabecera
  proveedor: {
    type: String,
    required: true,
    trim: true,
  },
  fechaEmision: {
    type: Date,
    required: true,
  },
  validezDias: {
    type: Number,
    default: 0,
  },
  moneda: {
    type: String,
    enum: ["ARS", "USD", "USD_BLUE"],
    required: true,
  },
  condicionPago: {
    type: String,
  },
  // Datos cuantitativos
  cantidadCotizada: {
    type: Number,
    required: true,
    min: 1,
  },
  precioUnitario: {
    type: Number,
    required: true,
    min: 0,
  },

  // Calculos - Reglas de negocio
  procentajeDescuento: { type: Number, default: 0 },
  montoDescuentoTotal: { type: Number, default: 0 },
  subtotal: { type: Number, required: true },
  alicuotaIVA: { type: Number, required: true },
  montoIVA: { type: Number, required: true },
  total: { type: Number, required: true },

  observaciones: {
    type: String,
  },
});

// Definimos el esquema principal del requerimiento
const RequerimientoSchema = new Schema(
  {
    producto_id: {
      type: Schema.Types.ObjectId,
      ref: "Producto",
      required: true,
    },

    estado: {
      type: String,
      enum: ["BORRADOR", "COTIZANDO", "PAUSADO", "COMPRADO", "CANCELADO"],
      default: "COTIZANDO",
      required: true,
    },

    cantidadObjetivo: {
      type: Number,
      required: true,
      min: 1,
    },

    // Array de sub-documentos Cotización
    cotizaciones: [CotizacionSchema],

    // ID de la cotizacion ganadora
    cotizacionGanadora_id: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

// Exportamos el modelo
module.exports = mongoose.model("Requerimiento", RequerimientoSchema);
