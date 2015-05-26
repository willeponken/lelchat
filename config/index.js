"use strict";

return module.exports  = function  (lelchat) {

  /*
   * Express.JS configuration
   */
  require('./express')(lelchat);

  /*
   * Local variables for Lelchat
   */
  require('./locals')(lelchat);
};
