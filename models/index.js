"use strict";

return module.exports = function modelsIndex (db) {
  
  /*
   * Messages model
   */
  require('./messages')(db);

  /*
   * Users model
   */
  require('./users')(db);

};
