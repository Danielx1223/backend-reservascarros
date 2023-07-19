const express = require('express');
const router = express.Router();

//consultar reservas de un cliente
router.get('/reservations/user/:userid', (req, res, next) => {
  try {
    //res.status(200).send("Not implemented");
    throw new Error('Not implemented');
  } catch (error) {
    next(error);
  }
});

//consultar reservas todas
router.get('/reservations', (req, res, next) => {
  try {
    //res.status(200).send("Not implemented");
    throw new Error('Not implemented');
  } catch (error) {
    next(error);
  }
});

//consultar una reserva
router.get('/reservations/:id', (req, res, next) => {
  try {
    //res.status(200).send("Not implemented");
    throw new Error('Not implemented');
  } catch (error) {
    next(error);
  }
});

//crear una reserva
router.post('/reservations', (req, res, next) => {
  try {
    //res.status(200).send("Not implemented");
    throw new Error('Not implemented');
  } catch (error) {
    next(error);
  }
});

//Anular una reserva
router.delete('/reservations', (req, res, next) => {
  try {
    //res.status(200).send("Not implemented");
    throw new Error('Not implemented');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
