import puppeteer from 'puppeteer';

/**
 * Clase que interactúa con el navegador y consigue el html de una url
 * @class Scraper
 * @property {Boolean} isReady Si el navegador está listo
 * @property {Browser} browser El navegador
 * @property {Promise} promise La promesa de inicialización del navegador
 */
class Scraper{
    /**
     * @constructor
     */
    constructor(){
        this.isReady = false;
        this.browser = null;
        this.promise = this.init();
    }
    /**
     * Inicializa el navegador
     * @returns {Promise<void>}
     */
    async init(){
        this.browser = await puppeteer.launch({
            headless:true,
            args:["--no-sandbox"]
        });
        this.isReady = true;
    }

    /**
     * Cierra el navegador
     * @returns {Promise<void>}
     */
    async close(){
        this.browser.close();
    }

    /**
     * Consigue el html de una url
     * @param {String} url
     * @returns {Promise<String>} Html de la url
     */
    async getHtml(url){
        await this.promise;
        const page = await this.browser.newPage();

        await page.setExtraHTTPHeaders({ 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36', 
            'upgrade-insecure-requests': '1', 
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8', 
            'accept-encoding': 'gzip, deflate, br', 
            'accept-language': 'en-US,en;q=0.9,en;q=0.8' 
        }); // esto no es necesario, pero puede ayudar a evitar que detecten el scraper como un bot
        await page.goto(url);
        const html = await page.content();
        await page.close();
        return html;
    }

}

export default Scraper;