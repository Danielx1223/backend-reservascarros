const express = require('express');
const carMethods = require('../utils/carMethods');
const authGuard = require('../middlewares/authGuard');
const Car = require('../models/car');
const router = express.Router();

// buscar lista de carros
router.get('/cars', authGuard, async (req, res, next) => {
  try {
    const listaCars = await Car.find();
    res.json(listaCars);
  } catch (error) {
    next(error);
  }
});

// buscar carro específico
router.get('/cars/:carid', authGuard, async (req, res, next) => {
  const carId = req.params.carid;
  try {
    console.log(req.jwt_payload);
    const listaCar = await Car.findById(carId);
    if (listaCar) {
      res.json(listaCar);
    } else {
      res.status(404).send('carro no encontrado.');
    }
  } catch (error) {
    next(error);
  }
});

// colocar más carros
router.post('/cars', authGuard, async (req, res, next) => {
  try {
    if (req.jwt_payload.role == 'admin') {
      const plate = await carMethods.registerCar(req.body);
      if (plate.success) {
        res.status(200).json({
          message: 'Carro registrado con éxito.',
          data: plate.data,
        });
      } else {
        res.status(400).json({
          message: 'Carro NO registrado con éxito.',
          data: plate.error,
        });
      }
    } else {
      res.status(401).send('No posees privilegios para ejecutar esta opción.');
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/cars/:carid', authGuard, async (req, res, next) => {
  const carId = req.params.carid;
  try {
    console.log(req.jwt_payload);
    if (req.jwt_payload.role == 'admin') {
      const listaCar = await Car.findByIdAndDelete(carId);
      if (listaCar) {
        res.json(listaCar);
      } else {
        res.status(404).send('Carro no encontrado.');
      }
    } else {
      res.status(401).send('No posees privilegios para ejecutar esta opción.');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
