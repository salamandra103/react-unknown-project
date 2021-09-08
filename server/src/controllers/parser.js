const createError = require("http-errors");
const axios = require("axios");

const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

exports.parserGet = async(req, res, next) => {
	try {
		const browser = await puppeteer.launch({});
		const page = await browser.newPage();
		await page.goto("https://www.google.ru/");
		await page.screenshot({ path: "example.png" });

		await browser.close();

		// const { data } = await axios.get("https://news.ycombinator.com/");
		// const $ = cheerio.load(data);
		// const array = [];
		// $("table#hnmain tr.athing").each((index, item) => {
		// 	array.push({
		// 		html: $(item).html(),
		// 	});
		// });

		// res.setHeader("Content-Type", "text/html");
		// res.send(array);

		res.status(200).send("Success");
	} catch (e) {
		console.log(e);
		res.status(404).send(e);
	}
};
