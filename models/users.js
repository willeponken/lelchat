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

return module.exports = function usersModel(db) {

  db.serialize(function() {

    // USERS Table
    //                         ID of the user                        Username   Password       User type, 0 = admin & 1 = user
    db.run('CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT, type INT);');

    // Insert admin user
    db.run('INSERT INTO users VALUES(NULL, "admin", "$2a$10$cJxuLa4y4rW.04PwaefFfesJfzmnkJe.QnEnQEJrjpBJtG5awae3K", 0)');
    // Insert bigstuff89 user (test user)
    db.run('INSERT INTO users VALUES(NULL, "bigstuff89", "$2a$10$AwUvGQoUOUzE7Vbtzf11F.N7Qfw3tGHAUN4tI6sn0zFUP12DUIFmy", 1)');
   
  });
};
