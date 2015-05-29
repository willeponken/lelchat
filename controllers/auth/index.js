/* @licence
 *
 * Copyright (C) 2015 William Wennerström
 * 
 * This program is free software: 
 * You can redistribute it and/or modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation, version. This program is distributed in the 
 * hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
 *
 * See the GNU General Public License for more details. 
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <http://www.gnu.org/licenses/>.
 *
 */

"use strict";

var router  = require('express').Router(),
    path    = require('path'),
    bcrypt  = require('bcrypt');

module.exports  = function  authController (db) {

  /*
   * POST /
   * Post login credentials
   */
  router.post('/', function(req, res, next) {
    var body    = req.body,
        session = req.session;
  
    if (!body.name || !body.password) {
      return res.sendStatus(400).end();
    }

    // Get the user with the defined name
    db.get('SELECT * FROM users WHERE name=$name', {
      $name: body.name
    },

    function(err, user) {
      if (err) {
        return next(new Error(err));
      }

      if (!user) {
        console.warn('User failed to log in: ' + body.name);
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
