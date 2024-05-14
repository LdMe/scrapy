import puppeteer from "puppeteer";


class Scraper {

    constructor(){
        this.browser = null;
        this.isReady = false;
        this.promise = this.init();
    }
    async init(){
        this.browser = await puppeteer.launch({
            headless:true,
            args:["--no-sandbox"]
        });
        this.isReady = true;
    }
    close(){
        this.browser.close();
    }
    async getHtml(url){
        await this.promise;
        const page = await this.browser.newPage();
        await page.goto(url);
        const html = await page.content();
        await page.close();
        return html;
    }
}

export default Scraper;