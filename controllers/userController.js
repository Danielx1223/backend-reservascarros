const express = require('express');
const router = express.Router();

const userMethods = require('../utils/userMethods');
const User = require('../models/user');
const authGuard = require('../middlewares/authGuard');

//Metodo POST recurso users - Para registrar nuevos usuarios en la BD
router.post('/users', async (req, res, next) => {
  try {
    const email = await userMethods.registerUser(req.body);
    if (email.success) {
      res.status(200).json({
        message: 'Usuario registrado con éxito.',
        data: email.data,
      });
    } else {
      res.status(400).json({
        message: 'Usuario NO registrado con éxito.',
        data: email.error,
      });
    }
  } catch (err) {
    res.status(400);
    next(err);
  }
});

router.post('/users/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const accessToken = await userMethods.loginUser(username, password);
    if (accessToken) {
      res.status(200).json(accessToken);
    } else {
      res.status(404).send('Nombre de usuario o contrasena incorrecta.');
    }
  } catch (err) {
    next(err);
  }
});

//authGuard sólo es si tengo los permisos puedo acceder a ese recurso
router.get('/users', authGuard, async (req, res, next) => {
  try {
    console.log(req.jwt_payload);
    if (req.jwt_payload.role == 'admin') {
      const listaUsuarios = await User.find();
      res.json(listaUsuarios);
    } else {
      res.status(401).send('No posees privilegios para ejecutar esta opción.');
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get('/users/:userid', authGuard, async (req, res, next) => {
  const userId = req.params.userid;
  try {
    console.log(userId);
    const listaUser = await User.findById(userId);
    if (listaUser) {
      res.json(listaUser);
    } else {
      res.status(404).send('Usuario no encontrado.');
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
