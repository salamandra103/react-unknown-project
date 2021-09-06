const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const verifyAccessToken = (req, res, next) => {
	const accessToken = req.header("Authorization");
	const { payload: { id } } = jwt.decode(accessToken, { complete: true });
	if (accessToken) {
		jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
			if (err) {
				res.status(500).send({ ...err, message: "Access token expired" });
			} else {
				next();
			}
		});
	} else {
		next(createError("token not haven't"));
	}
};

module.exports = { verifyAccessToken };
