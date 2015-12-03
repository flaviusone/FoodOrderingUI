'use strict'

var db = require ('../db/db.js');

function chat (chatStructure, cb)
{
  db.addChatMessage (chatStructure.roomId, chatStructure.userId, chatStructure.message,
  					function (err){
  		if (err)
  			cb (err);
  		else
		{
			db.findUserNameById (chatStructure.userId, function (err, userName){
				cb (err, {
					userId: charStructure.userId, 
					message: chatStructure.message, 
					userName: userName
				});
			});
		}
  	});
}

module.exports.chat = chat;

