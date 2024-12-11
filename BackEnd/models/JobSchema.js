import { application } from "../models/ApplicationSchema.js";
import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    requirements: [{
        type: String
    }],
    jobType: {
        type: String, 
        required: true
    },
    position:{
        type: Number,
        required: true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,ref:"Company",
        required: true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,ref:"user",
        required: true
    },
    applications:[{
        type:mongoose.Schema.Types.ObjectId,ref:"application"
    }]
},{timestamps: true});//for timestamps

export const job = mongoose.model("job", JobSchema);