"use strict";

return module.exports = function errorHandler (err, req, res, next) {
  console.error(err);
  
  res.sendStatus(500);

  return next();
};
