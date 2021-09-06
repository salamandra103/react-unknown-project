const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const handleErrors = (err) => {
	const errors = { email: "", password: "" };
	if (err.code === 11000) {
		errors.email = "Данная почта уже занята";
		return errors;
	}

	if (err.message.includes("user validation failed")) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	} else {
		if (err.message === "invalide email") {
			errors.email = "Неправильный адрес почты";
		}
	
		if (err.message === "invalide password") {
			errors.password = "Неправильный пароль";
		}
	}

	return errors;
};

const createAccessToken = (id) => jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
	expiresIn: process.env.ACCESS_TOKEN_LIFE,
});

const createRefreshToken = (id) => jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
	expiresIn: process.env.REFRESH_TOKEN_LIFE,
});

// Регистрация
exports.signUpPost = (req, res, next) => {
	const { email, password } = req.body;

	User.create({ email, password }, (err, data) => {
		if (err) {
			res.status(404).send(handleErrors(err));
		} else {
			res.status(201).json({ user: data._id });
		}
	});
};

// Авторизация
exports.loginPost = async(req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		const accessToken = createAccessToken(user._id);
		const refreshToken = createRefreshToken(user._id);
		User.findOneAndUpdate({ _id: user._id }, { refreshToken }, { new: true }, (err, data) => {
		});
		
		res.json({ accessToken, id: user._id });
	} catch (err) {
		res.status(404).send(handleErrors(err));
	}
};

// Обновления токена по рефреш токену
exports.refreshTokenPost = async(req, res, next) => {
	const { id } = req.body;
	try {
		const user = await User.findById({ _id: id }, (err, data) => {
			jwt.verify(data.refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
				if (err) {
					res.status(500).send({ ...err, message: "Refresh token expired" });
				} else {
					const accessToken = createAccessToken(data._id);
					const refreshToken = createRefreshToken(data._id);
					User.findOneAndUpdate({ _id: data._id }, { refreshToken });
					res.json({ accessToken, id: data._id });
				}
			});
		});
	} catch (err) {
		res.status(500).send(err);
	}
};
