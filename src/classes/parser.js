import { JSDOM } from "jsdom";



class Parser {
    /**
     * constructor
     * @param {String} html el html que se va a parsear
     * @classdesc
     * Clase que se encarga de parsear el HTML de la página de eroski y devolver un array de productos
     * @property {String} html El html que se va a parsear
     * @property {JSDOM} dom El dom que se va a parsear
     */
    constructor(html) {
        this.html = html;
        this.dom = new JSDOM(html);
    }
    
    /**
     * Consigue todos los anuncios
     * @returns {Array<Element>} Array de elementos que contienen los productos
     */
    getItems() {
        const results = this.dom.window.document.querySelectorAll(".p-3.border.rounded.mb-3.bg-white");
        const resultsArray = Array.from(results);
        return resultsArray;
    }

    /**
     * Consigue el titulo de un anuncio
     * @param {Element} item El elemento que contiene el anuncio
     * @returns {String} El titulo del anuncio
     */
    getTitle(item) {
        const title = item.querySelector("a.font-weight-bold.text-cyan-700");
        return title.textContent.trim();
    }

    /**
     * Consigue el nombre de la empresa
     * @param {Element} item El elemento que contiene el anuncio
     * @returns {String} El nombre de la empresa
     */
    getCompany(item) {
        const company = item.querySelector("a.text-primary.link-muted");
        return company.textContent.trim();
    }
    
    /**
     * Consigue la info de la oferta
     * @param {Element} item El elemento que contiene el anuncio
     * @returns {Array<String>} La info de la oferta
     */
    getJobInfo(item) {
        const jobInfo = item.querySelector(".text-right");
        const html = jobInfo.innerHTML.trim();
        // apply regex to split into array
        const regex = /<.+?>/ig;
        let results = html.split(regex);
        results = results.map(result => result.trim());
        const result = results.filter(result => result.length > 0 && result !="Actualizada");
        return result;

    }

    /**
     * Consigue la fecha de la oferta
     * @param {Array<String>} data La info de la oferta
     * @returns {String} La fecha de la oferta
     */
    getPublishedDate(data) {
        const publishedDate = data[0];
       
        return publishedDate;
    }

    /**
     * Consigue el salario de la oferta
     * @param {Array<String>} data La info de la oferta
     * @returns {String} El salario de la oferta
     */
    getSalary(data) {
        const salary = data.find(item => item.includes("€")) || "No disponible";
        return salary;
    }

    /**
     * Consigue la provincia de la oferta
     * @param {Array<String>} data La info de la oferta
     * @returns {String} La provincia de la oferta
     */
    getProvince(data) {
        const province = data[1];
        if(province.includes("remoto")){
            return "No especificada";
        }
        return province;
    }

    /**
     * Consigue el tipo de trabajo: remoto, híbrido, presencial...
     * @param {Array<String>} data La info de la oferta
     * @returns {String} El tipo de trabajo
     */
    getJobType(data) {
        const jobType = data.find(item => item.toLowerCase().includes("remoto") || item.toLowerCase().includes("híbrido") || item.toLowerCase().includes("presencial")) || "No especificado";
        return jobType.replace(/[\(\)]/g,"");
    }

    /**
     * Consigue la descripción de la oferta
     * @param {Element} item El elemento que contiene el anuncio
     * @returns {String} La descripción de la oferta
     */
    getDescription(item) {
        const description = item.querySelector(".hidden-md-down.text-gray-800");
        return description.textContent.trim();
    }

    /**
     * Consigue el link de la oferta
     * @param {Element} item El elemento que contiene el anuncio
     * @returns {String} El link de la oferta
     */
    getLink(item) {
        const link = item.querySelector("a.font-weight-bold.text-cyan-700");
        return link.href;
    }

    /**
     * Consigue los tags de la oferta
     * @param {Element} item El elemento que contiene el anuncio
     * @returns {Array<String>} Los tags de la oferta
     */
    getTags(item) {
        const tags = item.querySelectorAll(".badge");
        const result = Array.from(tags).map(tag => tag.textContent.trim());
        return Array.from(new Set(result));
    }
}
export default Parser;