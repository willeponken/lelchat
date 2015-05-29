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

var router  = require('express').Router();

module.exports  = function  adminController (db) {

  /*
   * GET /
   * Render admin page
   */
  router.get('/', function(req, res) {
    var messages = [],
        session  = req.session;

    db.each('SELECT * FROM messages ORDER BY id DESC', function(err, row) {
      messages.push({
        id  : row.id,
        name: row.name,
        date: row.date,
        text: row.text
      });
    },
    function(err) {
      if (err) {
        return res.sendStatus(500).end();
      }

      return res.render('admin', {
        user: session.user,
        messages: messages
      });
    });
  });

  return router;
};
