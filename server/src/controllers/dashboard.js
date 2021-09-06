const createError = require("http-errors");

const Dashboard = require("../models/dashboard");

exports.dashboardGet = (req, res, next) => {
	Dashboard.find({}, (err, data) => {
		if (err) {
			res.status(404).send(err);
		} else {
			res.status(201).json(data);
		}
	});
};

exports.dashboardPost = (req, res, next) => {
	Dashboard.create(req.body, (err, data) => {
		if (err) {
			res.status(404).send(err);
		} else {
			res.status(201).json(data);
		}
	});
};

exports.dashboardPut = (req, res, next) => {
	Dashboard.findByIdAndUpdate(req.body._id, req.body, (err, data) => {
		if (err) {
			res.status(404).send(err);
		} else {
			res.status(201).json({ id: data._id });
		}
	});
};

exports.dashboardDelete = (req, res, next) => {
	Dashboard.deleteOne({ _id: req.body._id }, (err, data) => {
		if (err) {
			res.status(404).send(err);
		} else {
			res.status(201).json({ id: req.body._id });
		}
	});
};
