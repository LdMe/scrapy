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
     * Consigue la sección del html que contiene todos los productos
     * @returns {Element} Elemento que contiene todos los productos
     */
    getListSection() {
        const result = this.dom.window.document.querySelector(".product-lineal-content");
        return result;
    }
    /**
     * Consigue todos los productos de la sección
     * @param {Element} section Elemento que contiene todos los productos
     * @returns {Array<Element>} Array de elementos que contienen los productos
     */
    getItems(section) {
        const results = section.querySelectorAll(".product-item");
        const resultsArray = Array.from(results);
        return resultsArray;
    }

    /**
     * Consigue el título de un producto
     * @param {Element} item Elemento que contiene el producto
     * @returns {String} Título del producto
     */
    getTitle(item) {
        const result = item.querySelector(".product-title");
        return result.textContent.trim();
    }

    /**
     * Consigue el precio de un producto
     * @param {Element} item Elemento que contiene el producto
     * @returns {Number} Precio del producto
     */
    getPrice(item) {
        const result = item.querySelector(".price-offer-now");
        const price = result.textContent.trim();
        const priceNumber = parseFloat(price.replace(",", "."));
        return priceNumber;
    }

    /**
     * Consigue la url de la imagen de un producto
     * @param {Element} item Elemento que contiene el producto
     * @returns {String} Url de la imagen del producto
     */
    getImage(item) {
        const result = item.querySelector(".product-image img");
        return result.src;
    }

    /**
     * Junta todos los métodos anteriores para conseguir un array de productos
     * @returns {Array<Product>} Array de productos
     */
    getProducts() {
        const section = this.getListSection();
        const items = this.getItems(section);
        const products = items.map(item => {
            const nombre = this.getTitle(item);
            const precio = this.getPrice(item);
            const imagen = this.getImage(item);
            return { nombre, precio, imagen };
        })
        return products;
    }
}

export default Parser;