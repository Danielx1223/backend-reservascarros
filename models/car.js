const { Schema, model } = require('mongoose');

const carSchema = new Schema(
  {
    plate: {
      type: String,
      unique: true,
      require: [true, 'Ingrese el numero de placa del vehículo'],
    },
    year: {
      type: Number,
      min: 2010,
      required: [true, 'Ingrese el año del vehiculo'],
    },
    brand: {
      type: String,
      required: [true, 'Ingrese la marca del vehiculo'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: 'creationDate', updatedAt: 'lastUpdate' },
  }
);

const Car = model('Car', carSchema);
module.exports = Car;
