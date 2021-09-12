const createError = require("http-errors");
const axios = require("axios");

const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

exports.parserGet = async(req, res, next) => {
	try {
		const browser = await puppeteer.launch({});
		const page = await browser.newPage();
		await page.goto(req.query.url, {
			waitUntil: 'networkidle2'
		});
		const html = await page.$('html')
		const htmlDom = await page.evaluate((html) => html.innerHTML, html)
		await browser.close();

		let data = []; 
		const $ = cheerio.load(htmlDom);
		$('div[class="sc-16r8icm-0 sc-1uagfi2-0 bdEGog sc-1rmt1nr-1 eCWTbV"]:nth-child(1) div[class="sc-1rmt1nr-0 sc-1rmt1nr-4 eQRTPY"]').each((index, element) => {
			let logoSrc = $(element).find('img.coin-logo').attr('src');
			let name = $(element).find('span.alias').text();
			let priceChange = $(element).find('div.price-change').text();

			data.push({
				logoSrc,
				name,
				priceChange,
			});
		})
		res.status(200).send(data)
	} catch (e) {
		console.log(e);
		res.status(404).send(e);
	}
};
