const createError = require("http-errors");
const request = require("request");

exports.parserGet = async(req, res, next) => {
	let data = null;
	await request("http://www.google.com", (error, response, body) => {
		if (!error && response.statusCode === 200) {
			data = body;
		}
	});
	console.log(data);
	res.sendStatus(201).send(1);
};
