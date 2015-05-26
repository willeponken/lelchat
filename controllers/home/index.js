"use strict";

var router  = require('express').Router();

module.exports  = function  homeController (lelchat, db) {

  /*
   * GET /
   * Render home page
   */
  router.get('/', function(req, res) {
    var messages = [];

    db.each('SELECT * FROM messages', function(err, row) {
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
