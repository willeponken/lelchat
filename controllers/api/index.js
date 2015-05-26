"use strict";

var router = require('express').Router(),
    bcrypt = require('bcrypt');

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
  router.post('/message', function(req, res) {
    var body = req.body;

    // Get the user with the defined name
    db.get('SELECT * FROM users WHERE name="' + body.name + '"', function(err) {
      if (err) {
        return res.sendStatus(500).end();
      }
    },
    function(err, user) {
      if (err) {
        return res.sendStatus(500).end();
      }

      if (!user) {
        return res.sendStatus(401).end();
      }
     
      
      // Compare password and the stored hash
      bcrypt.compare(body.password, user.password, function(err, result) {
        if (err) {
          return res.sendStatus(500).end();
        }

        if (result === true) {
          
          db.run('INSERT INTO messages VALUES(NULL,'     +          // Message ID (autoincrement -> NULL)
                                              user.id    + ', "'  + // User ID
                                              new Date() + '", "' + // Date of submission
                                              user.name  + '", "' + // User name
                                              body.text  + '");');  // Text message
          

          console.info('Saved new message from: ' + user.name);
          return res.redirect('/');
        }
      });

    });
  });

  /*
   * POST /register
   * Register user
   */
  router.post('/register', function(req, res) {
    var body = req.body;

    // Check if user already exists
    db.get('SELECT * FROM users WHERE name="' + body.name + '"', function(err, row) {
      if (err) {
        return res.sendStatus(500).end();
      }
    },
    function(err, found) {
      if (err) {
        return res.sendStatus(500).end();
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
          return res.sendStatus(500).end();
        }

        db.run('INSERT INTO users VALUES(NULL,"'             +          // User ID (autoincrement -> NULL)
                                         body.name           + '", "' + // User name
                                         hash                + '", "' + // Hashed password for user
                                         parseInt(body.type) + '");');  // User type (0 or 1)

        console.info('New user registered: ' + body.name + ' as type: ' + body.type);
        return res.redirect('back'); // Return to where referer points
      });

    });
  });
    
  return router;
};
