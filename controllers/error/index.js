"use strict";

return module.exports = function errorHandler (err, req, res, next) {
  console.error(err);
  
  return res.sendStatus(err.statusCode || 500);
};
