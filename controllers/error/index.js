"use strict";

return module.exports = function errorHandler (err, req, res, next) {
  res.sendStatus(500);

  return next();
};
