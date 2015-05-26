"use strict";

var bodyParser  = require('body-parser'),
    express     = require('express'),
    path        = require('path');

return module.exports  = function  expressConfiguraion (lelchat) {


  /*
   * Default variables
   */
  // ENGINE variable
  lelchat.engine('jade', require('jade').__express);

  // SET variables
  lelchat.set('listen', process.env.LISTEN || // default to listen env
                        process.env.PORT   || // else use port env
                        8080);                // falling back to fixed port
  lelchat.set('views', path.join(__dirname, '../views'));
  lelchat.set('view engine', 'jade');
  lelchat.set('jsonp callback', true);

  // USE variables
  lelchat.use(bodyParser.urlencoded({ // support for parsing url encoding
    extended: true
  }));
  lelchat.use(bodyParser.json());     // support for parsing JSON
  lelchat.use(express.static(path.join(__dirname, '../public')));


  /*
   * Secure HTTP headers for the paranoid
   */
  // DISABLE variables
  lelchat.disable('x-powered-by');

  // USE variables (encapsulated as middleware)
  lelchat.use(function(req, res, next) {
    res.setHeader('X-Frame-Options', 'sameorigin');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('Expires', '-1');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'master-only');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Content-Security-Policy', 
                  "default-src 'none';" +
                  "connect-src 'self';" +
                  "style-src 'self';"   + 
                  "script-src 'self';"  +
                  "font-src 'self';"    +
                  "img-src 'self'");
    return next();
  });
};
