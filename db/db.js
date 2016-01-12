'use strict'

var mongoose = require ('mongoose');
var debug = require ('debug') ('food-server:db');

var URL = 'mongodb://food:hungry@ds053874.mongolab.com:53874/food-order';
//ioana
//f00d0rder

var roomSchema = mongoose.Schema ({
	name: String,
	owner: {
		_id: mongoose.Schema.Types.ObjectId,
		name: String
	},
	_id: {type: mongoose.Schema.Types.ObjectId, default: function () { return new mongoose.Types.ObjectId()}},
	hourLimit: Date,
	imgUrl: String,
	restaurantId: mongoose.Schema.Types.ObjectId,
	users: [mongoose.Schema.Types.ObjectId],
	chat: [{
		userId: mongoose.Schema.Types.ObjectId,
		userName: String,
		message: String
	}]
});

var restaurantSchema = mongoose.Schema ({
	_id: {type: mongoose.Schema.Types.ObjectId, default: function () { return new mongoose.Types.ObjectId()}},
	pageUrl: String,
	name: String,
	imgUrl: String,
	deliveryTime: String,
	minimumOrder: String,
	menu: [{
		name: String,
		price: String,
		description: String,
		quantity: String
	}]
});

var userSchema = mongoose.Schema ({
	_id: {type: mongoose.Schema.Types.ObjectId, default: function () { return new mongoose.Types.ObjectId()}},
	username: String,
	name: String,
	orders: [{
		_id: {type: mongoose.Schema.Types.ObjectId, default: function () { return new mongoose.Types.ObjectId()}},
		name: String,
		price: Number
	}]
});

var Room = mongoose.model ('Room', roomSchema);
var Restaurant = mongoose.model ('Restaurant', restaurantSchema);
var User = mongoose.model ('User', userSchema);

function addRoom (userId, hourLimit, restaurantId, cb)
{
	getUserNameById (userId, function (err, userName){
		if (err)
			debug ('Could not add room '+err);
		else
		{
			var room = new Room ({
			owner: {_id: userId, name: userName},
			name: name,
			restaurantId: restaurantId,
			users: [userId],
			chat: []
			});

			if (hourLimit)
			{
				room.hourLimit = hourLimit;
			}

			room.save (function (err){
				cb (err);
			});
		}
	});
}

function addRestaurant (restaurant, cb)
{
	var dbRestaurant = new Restaurant (restaurant);

	dbRestaurant.save (function (err){
		cb (err);
	});
}

function addUser (cb)
{
	//TODO

	//just testing
	var user  = new User ({
		username: 'testuser2',
		name: 'I test also'
	});

	user.save (function (err){
		cb (err);
	});
}

function getRestaurantById (restaurantId, cb)
{
	Restaurant.findOne ({_id:restaurantId}, function (err, doc){
		if (err)
			cb (err);
		else
		{
			if (!doc)
			{
				debug ("Restaurant with id" + restaurantId + " not found");
			}
			cb (err, doc);
		}
	});
}

function getRoomById (roomId, cb)
{
	Room.findOne ({_id:roomId}, function (err, doc){
		if (err)
			cb (err);
		else
		{
			if (!doc)
			{
				debug ("Room with id " + roomId + " not found");
			}
			cb (err, doc);
		}
	});
}

function addUserToRoom (userId, roomId, cb)
{
	Room.findByIdAndUpdate (roomId, {$addToSet: {users: userId}}, function (err){
		if (err)
			debug ('Could not add user to room ' + err);
		cb(err);
	});
}

function removeUserFromRoom (userId, roomId, cb)
{
	Room.findByIdAndUpdate (roomId, {$pull: {users: userId}}, function (err){
		if (err)
			debug ('Could not remove user from room ' + err);
		cb (err);
	});
}

function addOrdersToUser (userId, orders, cb)
{
	User.findByIdAndUpdate (userId, {$set: {orders: orders}}, {upsert: true},
		function (err){
			if (err)
				debug ('Could not add orders to user ' + err);
			cb (err);

	});
}

function removeOrderFromUser (userId, orderId, cb)
{
	User.findByIdAndUpdate (userId, {$pull: {orders: {_id: orderId}}},
		function (err){
			if (err)
				debug ('Could not remove order from user ' + err);
			cb (err);

	});
}

function removeAllOrdersFromUser (userId, cb)
{
	User.findByIdAndUpdate (userId, {$set: {orders: []}},
		function (err){
			if (err)
				debug ('Could not remove all orders from user ' + err);
			cb (err);

	});
}

function deleteRoom (roomId, cb)
{
	Room.remove ({_id:roomId}, function (err){
		if (err)
			debug ('Could not delete room '+err);
		cb (err);
	});
}

function getUserByUsername (username, cb)
{
	User.findOne ({username:username}, function (err, doc){
		if (err)
			debug ('Could not get user by username '+err);
		if (!doc)
			debug ('Username ' + username + ' does not exist');
		cb (err, doc);
	});
}

function getUserNameById (userId, cb)
{
	User.findOne ({_id:userId}, function (err, doc){
		if (err)
			debug ('Could not get user name by id '+err);
		else if (!doc)
		{
			debug ('User does not exits');
			cb (err, null);
		}
		else
			cb (err, doc.name);
	});
}

function getAllRooms (cb)
{
	Room.find ({}, function (err, docs){
		if (err)
			debug ('Could not get rooms '+err);
		cb (err, docs);
	});
}

function getAllUsers (cb)
{
	User.find ({}, function (err, docs){
		if (err)
			debug ('Could not get users '+err);
		cb (err, docs);
	});
}

function getUsersByRoomId (roomId, cb)
{
	getRoomById (roomId, function (err, room){
		if (err)
			cb (err);
		else
			User.find ({_id: {$in: room.users}}, function (err, docs){
				if (err)
					debug ('Could not find users '+err);
				cb (err, docs);
			});
	});
}

function addChatMessage (roomId, userId, userName, message, cb)
{
	debug ("roomId: " + roomId);
	Room.findByIdAndUpdate (roomId, {$push: {chat: {userId: userId, message: message, userName:userName}}},
	 function (err){
		if (err)
			debug ('Could not add chat message '+err);
		cb (err);
	});
}

module.exports = function (cb)
//function initDb ()
{
	mongoose.connect(URL);
	var db = mongoose.connection;
	db.on('error', function (err) {debug('connection error: '+err)});

	db.once('open', function (callback) {
		debug ('Connected to database');
		if (cb)
			cb();
	});
}

module.exports.addChatMessage = addChatMessage;
module.exports.addRoom = addRoom;
module.exports.addRestaurant = addRestaurant;
module.exports.addUser = addUser;
module.exports.addUserToRoom = addUserToRoom;
module.exports.addOrdersToUser = addOrdersToUser;
module.exports.removeOrderFromUser = removeOrderFromUser;
module.exports.removeUserFromRoom = removeUserFromRoom;
module.exports.removeAllOrdersFromUser = removeAllOrdersFromUser;
module.exports.deleteRoom = deleteRoom;
module.exports.getUserByUsername = getUserByUsername;
module.exports.getAllRooms = getAllRooms;
module.exports.getAllUsers = getAllUsers;
module.exports.getRestaurantById = getRestaurantById;
module.exports.getRoomById = getRoomById;
module.exports.getUsersByRoomId = getUsersByRoomId;
module.exports.getUserNameById = getUserNameById;
