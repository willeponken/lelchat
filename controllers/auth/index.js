"use strict";

var router  = require('express').Router(),
    path    = require('path'),
    sql     = require(path.join(__dirname, '../../lib/sql-utils')),
    bcrypt  = require('bcrypt');

module.exports  = function  authController (db) {

  /*
   * POST /
   * Post login credentials
   */
  router.post('/', function(req, res) {
    var body    = req.body,
        session = req.session;
  
    if (!sql.check(body)) {
      if (!body.name || !body.password) {
        return res.sendStatus(400).end();
      }

      /*if (session.user.name && session.user.id && session.user.type) {
        return next();*/

      // Get the user with the defined name
      db.get('SELECT * FROM users WHERE name=' + sql.escape(body.name), function(err) {
        if (err) {
          return next(new Error(err));
        }
      },
      function(err, user) {
        if (err) {
          return next(new Error(err));
        }

        if (!user) {
          console.warn('User failed to logged in: ' + user.name);
          return res.sendStatus(401).end();
        }


        // Compare password and the stored hash
        bcrypt.compare(body.password, user.password, function(err, success) {
          if (err) {
            return res.sendStatus(500).end();
          }

          if (success) {

            session.user = {
              id  : user.id,
              name: user.name,
              type: user.type
            };
            session.save();

            console.info('User logged in: ' + user.name);
            return res.redirect('/'); // Redirect to /

          } else {

            console.warn('User failed to logged in: ' + user.name);
            return res.sendStatus(401).end(); // 401 em' h4xX0rz!
          }
        });

      });
    } else {
      return res.sendStatus(406).end(); // Not acceptable
    }
  });

  /*
   * ALL *
   * Check for authentication and
   * route to login page if not logged in
   */
  router.all('*', function(req, res, next) {
    var session = req.session;
    
    // No logged in users during this session
    if (!session.user) {
      return res.render('login');

    // Logged in, continue
    } else {
      return next();
    }

  });


  /*
   * ALL /admin
   * ALL /api/admin/*
   * Check if user is administrator
   * and redirect to / if not
   */
   function checkAdministrator(req, res, next) {
     var session = req.session;

     // Administrator, carry on...
     if (session.user && session.user.type === 0) {
       return next();

       // Not administrator, redirect to home
     } else {
       return res.redirect('/');
     }
   }
   router.all('/admin', checkAdministrator);
   router.all('/api/admin/*', checkAdministrator);

  return router;
};
