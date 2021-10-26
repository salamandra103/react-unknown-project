const User = require("../models/user");

const getUserInfo = (req, res, next) => {
	User.findById(req.query.id, (err, data) => {
		if (err) {
			res.status(404).send(err);
		} else {
			res.status(201).json({
				email: data.email,
				personal: data.personalInfo,
				id: data.id,
			});
		}
	});
};

const setUserInfo = (req, res, next) => {
	User.findByIdAndUpdate(req.query.id, {
		$set: {
			personalInfo: req.body,
		},
	}, (err, data) => {
		if (err) {
			res.status(404).send("error");
		} else {
			res.status(201).send("ok");
		}
	});
};

module.exports = {
	getUserInfo,
	setUserInfo,
};
