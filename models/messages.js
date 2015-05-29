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

return module.exports = function messageModel(db) {

  db.serialize(function() {

    // MESSAGES Table
    //                            ID of the message                     User ID      Timestamp  Username   Message
    db.run('CREATE TABLE messages(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INT, date DATE, name TEXT, text TEXT);');

  });
};
