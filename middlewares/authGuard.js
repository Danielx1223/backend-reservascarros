const jwt = require('jsonwebtoken');

const authGuard = (req, res, next) => {
  //Buscamos el encabezado de authorization
  const { authorization } = req.headers;
  console.log(req.headers);

  if (!authorization) {
    res.status(401).send('No tienes permisos para acceder a este recurso');
  } else {
    try {
      //Authorization Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      const token = authorization.split(' ')[1];
      req.jwt_payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
      next();
    } catch (err) {
      console.log(err);
      res.status(401).send('No tiene permisos para usar este recurso.');
    }
  }
};
module.exports = authGuard;
