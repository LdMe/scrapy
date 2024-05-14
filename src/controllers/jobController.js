import JobOfferModel from "../models/jobOfferModel.js";
import Scraper from "../classes/scraper.js";
import Parser from "../classes/parser.js";

async function getAll(req,res){
    const jobOffers = await JobOfferModel.find();
    res.json(jobOffers);
}
async function fetchForm(req,res){
    res.render("fetch");
}
async function fetch(req,res){
    const query = req.body.search;
    const url = new URL("https://www.tecnoempleo.com/ofertas-trabajo/")
    url.searchParams.append("te",query);
    const scraper = new Scraper();
    const html = await scraper.getHtml(url.toString());
    scraper.close();
    const parser = new Parser(html);
    const results = parser.getOffers();
    results.forEach(result =>{
        JobOfferModel.create(result);
    })
    res.json(results);
}

export default {
    getAll,
    fetch,
    fetchForm
}