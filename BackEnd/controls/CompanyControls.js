import { Company } from "../models/CompanySchema.js"
import cloudinary from "../utilities/cloudinary.js";
import getDataUri from "../utilities/datauri.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                status: false
            })
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(409).json({
                message: "Company already exists",
                status: false
            })
        }

        company = await Company.create({
            name: companyName,
            userId: req.id
        });
        return res.status(201).json({
            message: "Company created successfully",
            status: true,
            company
        });
    } catch (error) {
        console.log(error);
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        let companies = await Company.find({ userId: userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found",
                status: false
            })
        }
        return res.status(201).json({
            companies,
            status: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCompanyId = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                status: false
            })
        }
        return res.status(200).json({
            message: "Company found",
            company,
            status: true,
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;

        if (file) {
            // Convert the file to a data URI format
            const fileUri = getDataUri(file);

            // Upload the file to Cloudinary
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

            // Extract the URL of the uploaded logo
            var logo = cloudResponse.secure_url; // Use 'var' or 'let' so it can be accessed outside
        }

        // Prepare the update data
        const updateData = { name, description, website, location };
        if (logo) {
            updateData.logo = logo;
        }

        // Update the company information
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                status: false
            });
        }

        return res.status(200).json({
            message: "Company updated successfully",
            company,
            status: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while updating the company",
            status: false
        });
    }
};
