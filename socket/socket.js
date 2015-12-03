'use strict'

var db = require ('../db/db.js');

function chat (chatStructure, cb)
{
  db.addChatMessage (chatStructure.roomId, chatStructure.userId, chatStructure.message, cb);
}

module.exports.chat = chat;

