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
};
