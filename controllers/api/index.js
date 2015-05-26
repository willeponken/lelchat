"use strict";

var router = require('express').Router();

return module.exports = function apiController (lelchat, db) {

  /*
   * GET /
   * Redirect to HOME
   */
  router.get('/', function(req, res) {

    res.redirect(303, '/');
  
  });

  return router;
};
