"use strict";

var router  = require('express').Router(),
    path    = require('path'),
    sql     = require(path.join(__dirname, '../../lib/sql-utils')),
    bcrypt  = require('bcrypt');

return module.exports = function apiController (lelchat, db) {

  /*
   * GET /
   * Redirect to HOME
   */
  router.get('/', function(req, res) {

    res.redirect(303, '/');
  
  });


  /*
   * POST /message
   * Post a message to the chat
   */
  router.post('/message', function(req, res, next) {
    var body    = req.body,
        user    = req.session.user;

    if (!sql.check(body)) {
      var dateNow = new Date().toISOString().replace('T', ' ').substr(0, 19);

      db.run('INSERT INTO messages VALUES(NULL,'                 + // Message ID (autoincrement -> NULL)
             user.id                + ', "'                      + // User ID
             dateNow                + '", "'                     + // Date of submission
             user.name              + '", '                      + // User name
             sql.escape(body.text)  + ');');                      // Text message


      console.info('Saved new message from: ' + user.name);
      return res.redirect('back'); // Back to last page
    } else {
      return res.sendStatus(406).end(); // Not acceptables
    }
  });


  /*
   * DELETE /admin/message
   * GET    /admin/message
   * Delete a message using its ID
   */
  function  deleteMessage (req, res, next) {
    var query = req.query;
    var messageID = parseInt(query.id);

    if (!sql.check(query)) {
      // Delete message with the defined ID
      if (typeof messageID === 'number' && messageID > 0) {

        // Query database deletion
        db.get('DELETE FROM messages WHERE id=' + messageID, function(err) {
          if (err) {
            return next(new Error(err));
          }

          console.info('Removed message with id: ' + messageID);
          return res.redirect('back'); //Back to last page
        });
      } else {
        return req.sendStatus(400).end();
      }
    } else {
      return res.sendStatus(406).end(); // Not acceptables
    }
  }

  // Copy of DELETE request to GET request because
  // no one is able to follow the fucking HTTP standard 
  // for the HTML forms.
  router.route('/admin/message')
    .get(deleteMessage)
    .delete(deleteMessage);


  /*
   * POST /admin/register
   * Register user
   */
  router.post('/admin/register', function(req, res, next) {
    var body = req.body;

    if (!sql.check(body)) {
    // Check if user already exists
    db.get('SELECT * FROM users WHERE name=' + sql.escape(body.name), function(err, row) {
      if (err) {
        return next(new Error(err));
      }
    },
    function(err, found) {
      if (err) {
        return next(new Error(err));
      }

      if (found) {
        // Send 409 (conflict) if user already exists
        return res.sendStatus(409).end();
      }

      if (!body.password      ||
          !body.name          ||
          !body.type          ||
          !(body.type === '0' ||
            body.type === '1'   )) {

        // Missing field, respond with 400 (bad request)
        return res.sendStatus(400).end();
      }

      bcrypt.hash(body.password, 10, function(err, hash) {
        if (err) {
          return next(new Error(err));
        }

        db.run('INSERT INTO users VALUES(NULL,'                 +         // User ID (autoincrement -> NULL)
                                         sql.escape(body.name)  + ', ' +  // User name
                                         sql.escape(hash)       + ', ' +  // Hashed password for user
                                         parseInt(body.type)    + ');');  // User type (0 or 1)

        console.info('New user registered: ' + body.name + ' as type: ' + body.type);
        return res.redirect('back'); // Return to where referer points
      });

    });
    } else {
      return res.sendStatus(406).end(); // Not acceptables
    }
  });
    
  return router;
};
