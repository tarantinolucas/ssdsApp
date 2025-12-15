// Importamos librerías necesarias
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definimos el esquema de los índices económicos
const IndicesEconomicosSchema = new Schema(
  {
    tipo: {
      type: String,
      required: true,
      enum: ["DOLAR_OFICIAL", "DOLAR_BLUE", "IPC"],
    },
    valor: {
      type: Number,
      required: true,
      min: 0,
    },
    fecha: {
      type: Date,
      required: true,
      set: (date) => new Date(date.setHours(0, 0, 0, 0)),
    },
    // Campo de auditoría y trazabilidad
    fuente: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Regla para evitar duplicados por tipo y fecha
IndicesEconomicosSchema.index({ tipo: 1, fecha: 1 }, { unique: true });

// Exportamos el modelo
module.exports = mongoose.model("IndicesEconomicos", IndicesEconomicosSchema);
