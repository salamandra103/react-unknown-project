const createError = require("http-errors");
const axios = require("axios");

const cheerio = require("cheerio");

exports.parserGet = async(req, res, next) => {
	try {
		const { data } = await axios.get("https://news.ycombinator.com/");
		const $ = cheerio.load(data);
		const array = [];
		$("table#hnmain tr.athing").each((index, item) => {
			array.push({
				html: $(item).html(),
			});
		});

		res.setHeader("Content-Type", "text/html");
		res.send(array);
	} catch (e) {
		console.log(e);
	}
};
