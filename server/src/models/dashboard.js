const mongoose = require("mongoose");

const { Schema } = mongoose;

const dashboard = new Schema([{
	title: String,
	categories: [{
		title: String,
		elements: [{
			title: String,
		}],
	}],
}]);

module.exports = mongoose.model("dashboard", dashboard);
