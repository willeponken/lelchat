"use strict";

var router  = require('express').Router();

module.exports  = function  adminController () {

  /*
   * GET /
   * Render admin page
   */
  router.get('/', function(req, res) {
    return res.render('admin');
  });

  return router;
};
