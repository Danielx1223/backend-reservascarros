const logRequest = (req, res, next) => {
  console.log('Peticion entrante: ' + req.path);
  console.log('Parametros:');
  console.log(req.params);
  console.log('Query: ');
  console.log(req.query);
  console.log('Cuerpo: ');
  console.log(req.body);
  next();
};

module.exports = logRequest;
