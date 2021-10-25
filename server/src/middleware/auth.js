const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const verifyAccessToken = (req, res, next, socket) => {
	const accessToken = (req.header && req.header("Authorization")) || req.headers.authorization;
	// const { payload: { id } } = jwt.decode(accessToken, { complete: true });

	if (accessToken) {
		jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
			if (err) {
				if (Object.keys(res).length) {
					console.log("Ошибка проверки токена для запроса");
					res.status(500).send({ ...err, message: "Access token expired" });
				} else {
					throw err;
				}
			} else {
				if (socket) {
					const expiresIn = (decoded.exp * 1000 - Date.now());
					const timeout = setTimeout(() => {
						socket.disconnect(true);
					}, expiresIn);

					socket.on("disconnect", () => {
						clearTimeout(timeout);
					});
				}

				next();
			}
		});
	} else {
		next(createError("token not haven't"));
	}
};

module.exports = { verifyAccessToken };
