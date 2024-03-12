module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500; // Internal Server Error
  error.status = error.status || "Error";

  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
      stackTrace: error.stack,
    //   error,
  });
};
