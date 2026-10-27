
function errorMiddleware(err, req, res, next) {
  console.error(err.stack || err.message);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    error: err.status ? err.message : "Internal server error",
  });
}

module.exports = errorMiddleware;
