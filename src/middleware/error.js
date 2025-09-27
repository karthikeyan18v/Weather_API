export function notFound(req, res, next) {
  res.status(404).json({ error: 'Not Found', path: req.originalUrl });
}

export function errorHandler(err, req, res, next) { // eslint-disable-line
  console.error(err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
}
