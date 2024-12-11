import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    role:{
        type: String,
        enum: ["employee","recruiter"],//for options
        required: true
    },
    profile:{
        bio:{type:String},
        skills: [{ type: String }],
        resume:{type:String},//for url   
        companyQriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,ref:"Company"},//creating relation b/w user and company
        profilePhoto:{type:String,default:""}
    }
},{timestamps:true});//to note time of creation and updation

export const user=mongoose.model("User",UserSchema);