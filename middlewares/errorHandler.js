const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    path: req.path,
    message: err.message,
    name: err.name,
    //stack: err.stack
  });
};

module.exports = errorHandler;
