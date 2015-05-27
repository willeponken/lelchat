"use strict";

var path  = require('path');

module.exports  = function  controllerIndex(lelchat, db) {

  /*
   * AUTH controller
   */
  lelchat.use(require('./auth')(db));

  /*
   * HOME controller
   */
  lelchat.use('/', require('./home')(db));

  /*
   * ADMIN controller
   */
  lelchat.use('/admin', require('./admin')(db));

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
  lelchat.use(function(req, res) {
    res.status(404);

    return res.type('txt').send('Not found');
  });
};
