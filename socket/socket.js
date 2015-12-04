'use strict'

var db = require ('../db/db.js');

function chat (chatStructure, cb)
{
	db.getUserNameById (chatStructure.userId, function (err, userName){
		if (err)
			cb (err);
		else
		{
			db.addChatMessage (chatStructure.roomId, chatStructure.userId, userName,
								chatStructure.message, function (err){
				cb (err, {
					userId: chatStructure.userId, 
					message: chatStructure.message, 
					userName: userName
					});
			});
		}	
	});
}

module.exports.chat = chat;
