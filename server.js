"use strict";

var express   = require('express'),
    lelchat   = exports.app = express(),
    http      = require('http'),
    path      = require('path'),
    fs        = require('fs'),
    sqlite3   = require("sqlite3").verbose(),
    db        = new sqlite3.Database(':memory:'); // Running in RAM like a pro


/*
 * Configuration
 */
require(path.join(__dirname, 'config'))(lelchat);

/*
 * Models
 */
require(path.join(__dirname, 'models'))(db);

/*
 * Controllers
 */
require(path.join(__dirname, 'controllers'))(lelchat, db);

/*
 * Start listening
 */
var listen  = lelchat.get('listen');
var server  = http.createServer(lelchat).listen(listen, function() {
  console.info('Listening on: ' + listen);
});
