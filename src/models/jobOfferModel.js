import mongoose from 'mongoose';

const jobOfferSchema = new mongoose.Schema({
    title: String,
    company: String,
    province: String,
    jobType: String,
    publishingDate:Date,
    description:String,
    contractType:String,
    workHours: String,
    salaryRange: String,
});

const JobOfferModel = mongoose.model("JobOffer",jobOfferSchema);

export default JobOfferModel