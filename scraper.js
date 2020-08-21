const puppeteer = require('puppeteer');

const getURL = (word) => `https://diccionariochileno.cl/search?s=${word}`;

const searchWord = async (word) => {
    const url = getURL(word);
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
    const page = await browser.newPage()
    page.setViewport({ width: 1280, height: 1000 })
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const definitions = await page.evaluate(() => {
        let a = []; 
        document.querySelectorAll('ul.terms li a').forEach(el => { 
            a.push({ text: el.textContent, link: el.getAttribute('href') }) 
        });
        return a;
    })
    return definitions;
}

module.exports = {
    searchWord
}