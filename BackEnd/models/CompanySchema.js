import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String,
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    logo: {
        type: String//url
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    }
},{timestamps: true});//for timestamps

export const Company = mongoose.model("Company", CompanySchema);