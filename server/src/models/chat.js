const mongoose = require("mongoose");

const { Schema } = mongoose;

const rooms = new Schema([
	{
		name: String,
		author: String,
		messages: [
			{
				value: String,
				id: Number,
				author: String,
			},
		],
	},
]);

module.exports = mongoose.model("rooms", rooms);
