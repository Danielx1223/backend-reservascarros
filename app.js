require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const xss = require('xss');
const statusMonitor = require('express-status-monitor')();

//Cargamos los routers del backend
const carRouter = require('./controllers/carController');
const reservationRouter = require('./controllers/reservationController');
const userRouter = require('./controllers/userController');

//Cargamos los middlewares
const errorHandler = require('./middlewares/errorHandler');
// const logHandler = require('./middlewares/logRequest');

//Configuramos MW para preproceso de peticiones
app.use(express.json()); //procesa los cuerpos de peticiones de formato json
// app.use(logHandler); //muestra en consola todas las peticiones

//configuración del módulo morgan Logger
const accessLogStream = fs.createWriteStream('./logs/acces.log', {
  flags: 'a',
});
app.use(morgan('combined', { stream: accessLogStream })); //config middleware Morgan
app.use(morgan('dev')); //configuración en consola log

//configuramos el monitor de satus
app.use(statusMonitor);

//Configuramos mensaje de bienvenida en la ruta raiz
app.get('/', async (req, res) => {
  res.send(xss('Bienvenido al API de Backend Car Rental'));
});

//Configuramos los routers en el app
app.use('/api/v1', carRouter);
app.use('/api/v1', reservationRouter);
app.use('/api/v1', userRouter);

//Registramos el MW de control de errores
app.use(errorHandler);

module.exports = app;
