"use strict";

return module.exports = function usersModel(db) {

  db.serialize(function() {

    // USERS Table
    //                         ID of the user                        Username   Password       User type, 0 = admin & 1 = user
    db.run('CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT, type INT);');

  });
};
