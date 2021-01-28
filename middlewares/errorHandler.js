// error handler

const sendError = (err, res) => {
  console.error(err);
  res.status(err.statusCode).json({ status: err.status, message: err.message });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "ERROR";
  sendError(err, res);
};
