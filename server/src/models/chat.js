const mongoose = require("mongoose");

const { Schema } = mongoose;

const message = new Schema({
	value: String,
	author: String,
});

const rooms = new Schema([
	{
		name: String,
		author: String,
		messages: [message],
	},
]);

module.exports = mongoose.model("rooms", rooms);
