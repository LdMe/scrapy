import JobOfferModel from "../models/jobOfferModel.js";

async function getAll(req,res){
    const jobOffers = await JobOfferModel.find();
    res.json(jobOffers);
}


export default {
    getAll
}