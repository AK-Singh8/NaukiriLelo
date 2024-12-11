import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"job",
        required: true
    },
    applicants:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    status:{
        type: String,
        enum: ['pending','accepted','rejected'],
        default: 'pending'
    }

},{ timestamps: true });//for timestamps

export const application = mongoose.model("application", ApplicationSchema);