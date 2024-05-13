import JobOfferModel from "../models/jobOfferModel.js";
import Scraper from "../classes/scraper.js";
import Parser from "../classes/parser.js";

const urls = {
    "indeed": "https://es.indeed.com/jobs?q=programador+junior",
    "tecnoempleo":"https://www.tecnoempleo.com/ofertas-trabajo/?te=junior+developer"
}
async function getAll(req,res){
    const jobOffers = await JobOfferModel.find();
    res.json(jobOffers);
}
async function fetchJobs(req,res){
    const ScraperInstance = new Scraper();

    const html = await ScraperInstance.getHtml(urls.tecnoempleo);
    res.send(html);
}

export default {
    getAll,
    fetchJobs
}