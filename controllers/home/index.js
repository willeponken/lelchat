"use strict";

var router  = require('express').Router();

module.exports  = function  homeController (lelchat, db) {

  /*
   * GET /
   * Render home page
   */
  router.get('/', function(req, res) {
   
    db.run('INSERT INTO messages VALUES(1, 1, "2015-05-26", "willeponken", "teeest");');
    db.each("SELECT rowid AS id, text FROM messages", function(err, row) {
      console.log(row.id + ": " + row.text);
    });
    
    res.render('home');

  });

  return router;
};
