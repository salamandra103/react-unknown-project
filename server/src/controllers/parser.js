const createError = require("http-errors");
const axios = require("axios");

const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

exports.parserGet = async(req, res, next) => {
	try {
		const browser = await puppeteer.launch({});
		const page = await browser.newPage();
		await page.goto(req.query.url, {
			waitUntil: "networkidle2",
		});
		// const html = await page.$("html");
		// const htmlDom = await page.evaluate((html) => html.innerHTML, html);
		const html = await page.content();
		await browser.close();
		
		const data = [];
		const $ = cheerio.load(html);
		$("div[class=\"sc-16r8icm-0 sc-1uagfi2-0 bdEGog sc-1rmt1nr-1 eCWTbV\"]:nth-child(1) div[class=\"sc-1rmt1nr-0 sc-1rmt1nr-4 eQRTPY\"]").each((index, element) => {
			const logoSrc = $(element).find("img.coin-logo").attr("src");
			const name = $(element).find("span.alias").text();
			const priceChange = $(element).find("div.price-change").text();

			data.push({
				logoSrc,
				name,
				priceChange,
			});
		});
		res.status(200).send(data);
	} catch (e) {
		res.status(404).json({
			error: e.message,
		});
	}
};

exports.getPage = async(req, res, next) => {
	try {
		const browser = await puppeteer.launch({});
		const page = await browser.newPage();
		await page.goto(req.query.url, {
			waitUntil: "networkidle2",
		});
		const html = await page.content();
		await browser.close();

		// res.setHeader("content-security-policy", "frame-ancestors 'self' https://ss.datasconsole.com;");
		res.setHeader("content-type", "text/html; charset=utf-8");
		// res.status(200).send("1");
		res.status(200).send(html);
	} catch (e) {
		console.log(e);
	}
};
