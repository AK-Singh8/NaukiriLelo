import { job } from "../models/JobSchema.js";

export const postJob = async (req, res) => {
    try {
        const {title,description,location,salary,requirements,jobType,position,experience,companyId}=req.body;
        const userId=req.id;
        if(!title || !description || !location || !salary || !requirements || !jobType || !position || !experience || !companyId){
            return res.status(400).json({
                message:"All fields are required",
                status:false
            })
        }
        const jobs=await job.create({
            title,
            description,
            location,
            salary:Number(salary),
            requirements:requirements.split(","),
            jobType,
            position,
            experience:experience,
            company:companyId,
            created_by:userId
        })

        return res.status(201).json({
            message:"New job created successfully",
            jobs,
            status:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while creating the job",
            status: false
        });
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword=req.query.keyword || "";
        const query={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}},
            ]
        }

        const jobs = await job.find(query).populate({path:"company"}).sort({createdAt:-1});//populate gives the company name[only id will be shown is this is not written]
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found",
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

export const getJobById = async (req, res) => {
    try {
        const JobId=req.params.id;
        const jobs=await job.findById(JobId).populate({
            path:"applications"
        });
        if(!jobs){
            return res.status(404).json({
                message:"Job not found",
                status:false
            })
        }
        return res.status(200).json({
            message:"Job found",
            jobs,
            status:true,
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAdminJob = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await job.find({ created_by: adminId })
            .populate('company')
            .sort({ createdAt: -1 });
        
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found for this admin",   
                status: false
            });
        }

        return res.status(200).json({
            message: "Jobs found",
            jobs,
            status: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while fetching jobs",
            status: false
        });
    }
};
