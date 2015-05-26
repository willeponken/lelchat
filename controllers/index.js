"use strict";

var path  = require('path');

module.exports  = function  controllerIndex(lelchat, db) {

  /*
   * HOME controller
   */
  lelchat.use('/', require('./home')(lelchat, db));

  /*
   * API controller
   */
  lelchat.use('/api', require('./api')(lelchat, db));

  /*
   * Error handler
   */
  lelchat.use(require('./error'));

  /*
   * Default route for unhandled requests
   */
  lelchat.use(function(req, res, next) {
    res.status(404);

    // Respond with JSON if supported
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return next();
    }

    // JSON is not supported, falling back to text
    res.type('txt').send('Not found');
    return next();
  });
};
