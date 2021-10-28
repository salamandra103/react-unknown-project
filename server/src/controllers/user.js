const bcrypt = require("bcrypt");
const User = require("../models/user");

const getUserInfo = (req, res, next) => {
	User.findById(req.query.id, (err, data) => {
		if (err) {
			res.status(404).json(err);
		} else {
			res.status(201).json({
				email: data.email,
				personal: data.personalInfo,
				id: data.id,
			});
		}
	});
};

const setUserInfo = async(req, res, next) => {
	try {
		await User.findByIdAndUpdate(req.query.id, { $set: { personalInfo: req.body } });
		res.status(201).json("ok");
	} catch (error) {
		res.status(404).json(error);
	}
};

const setPassword = async(req, res, next) => {
	try {
		const { password } = await User.findById(req.query.id);
		const isPasswordRepeat = await bcrypt.compare(req.body.password, password);
		if (isPasswordRepeat) {
			throw new Error("Вы ввели текущий пароль");
		} else {
			const salt = await bcrypt.genSalt();
			const password = await bcrypt.hash(req.body.password, salt);
			await User.findByIdAndUpdate(req.query.id, { $set: { password } });
			res.status(201).json("password saved");
		}
	} catch (error) {
		res.status(404).json(error.message);
	}
};

module.exports = {
	getUserInfo,
	setUserInfo,
	setPassword,
};
