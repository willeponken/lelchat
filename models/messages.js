"use strict";

return module.exports = function messageModel(db) {

  db.serialize(function() {

    // MESSAGES Table
    //                            ID of the message                     User ID      Timestamp  Username   Message
    db.run('CREATE TABLE messages(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INT, date DATE, name TEXT, text TEXT);');

  });
};
