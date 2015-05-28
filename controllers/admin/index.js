"use strict";

var router  = require('express').Router();

module.exports  = function  adminController (db) {

  /*
   * GET /
   * Render admin page
   */
  router.get('/', function(req, res) {
    var messages = [];

    db.each('SELECT * FROM messages ORDER BY id DESC', function(err, row) {
      messages.push({
        id  : row.id,
        name: row.name,
        date: row.date,
        text: row.text
      });
    },
    function(err) {
      if (err) {
        return res.sendStatus(500).end();
      }

      return res.render('admin', {
        messages: messages
      });
    });
  });

  return router;
};
