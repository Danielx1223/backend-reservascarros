const { Schema, model } = require('mongoose');
const Car = require('./car');
const User = require('./user');

const reservationSchema = new Schema(
  {
    reservedCar: {
      type: mongoose.Schema.type.ObjectId,
      ref: 'Car',
      required: [true, 'Ingrese la placa del vehiculo a reservar'],
    },
    customer: {
      type: mongoose.Schema.type.ObjectId,
      ref: 'User',
      required: [true, 'Ingrese el usuario que reserva'],
    },
    startDate: {
      type: Date,
      required: [true, 'Ingrese la fecha de inicio de la reserva'],
    },
    endDate: {
      type: Date,
      required: [true, 'Ingrese la fecha final de la reserva'],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: 'creationDate', updatedAt: 'lastUpdate' },
  }
);

const Reservation = model('Reservation', reservationSchema);
module.exports = Reservation;
