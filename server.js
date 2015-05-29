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
