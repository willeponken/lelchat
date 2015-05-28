"use strict";

var router  = require('express').Router();

module.exports  = function  homeController (db) {

  /*
   * GET /
   * Render home page
   */
  router.get('/', function(req, res) {
    var messages = [];

    db.each('SELECT * FROM messages ORDER BY id DESC', function(err, row) {
      messages.push({
        name: row.name,
        date: row.date,
        text: row.text
      });
    },
    function(err) {
      if (err) {
        return res.sendStatus(500).end();
      }

      return res.render('home', {
        messages: messages
      });
    });

  });

  return router;
};
