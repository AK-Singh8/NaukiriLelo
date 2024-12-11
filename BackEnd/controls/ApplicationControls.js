import { application } from "../models/ApplicationSchema.js";
import { job } from "../models/JobSchema.js";

export const applyJob=async (req,res)=>{
    try {
        const userId=req.id;
        const jobId=req.params.id;
        if(!jobId){
            return res.status(400).json({
                message:"Job id is required",
                status:false
            })
        }
        const existingAppliction=await application.findOne({job:jobId,applicants:userId});
        if(existingAppliction){
            return res.status(400).json({
                message:"Already applied for this job",
                status:false
            })
        }
        const jobs=await job.findById(jobId);
        if(!jobs){
            return res.status(404).json({
                message:"Job not found",
                status:false
            })
        }
        const newApplication=await application.create({
            job:jobId,
            applicants:userId
        })

        jobs.applications.push(newApplication._id);
        await jobs.save();

        return res.status(201).json({
            message:"Applied successfully",
            status:true
        })

    } catch (error) {
        console.log(error);
    }
}

export const getAppliedJobs=async (req,res)=>{
    try {
        const userId=req.id;
        const applications=await application.find({applicants:userId}).sort({createdAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}}
            }
        });

        if(!applications){
            return res.status(404).json({
                message:"Applications not found",
                status:false
            })
        }

        return res.status(200).json({
            applications,
            status:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getApplicants=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const jobs = await job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicants",
            }
        });
        

        if(!jobs){
            return res.status(404).json({
                message:"Job not found",
                status:false
            })
        }

        return res.status(200).json({
            jobs,
            status:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const updateStatus=async(req,res)=>{
    try {
        const {status} = req.body;
        const applicationId=req.params.id;
        if(!status){
            return res.status(400).json({
                message:"Status is required",
                status:false
            })
        }
        const applications = await application.findOne({_id:applicationId});
        if(!applications){
            return res.status(404).json({
                message:"Application not found",
                status:false
            })
        }
        applications.status=status.toLowerCase();
        await applications.save();
        return res.status(200).json({
            message:"Status updated successfully",
            status:true
        })
    } catch (error) {
        console.log(error);
    }
}