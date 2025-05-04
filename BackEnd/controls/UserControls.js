import { user } from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utilities/datauri.js";
import cloudinary from "../utilities/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, password, phone, role } = req.body;
        if (!fullname || !email || !password || !phone || !role) {
            return res.status(400).json({
                message: "Please enter all fields",
                status: false
            });
        }
        
        const file=req.file;
        const fileUri=getDataUri(file);
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content);

        let existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
                status: false
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await user.create({
            fullname,
            email,
            password: hashPassword,
            phone,
            role,
            profile: { 
                profilePhoto: cloudResponse.secure_url,
            }
        });
        

        return res.status(201).json({
            message: "User created successfully",
            status: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Please enter all fields",
                status: false
            });
        }

        let User = await user.findOne({ email });
        if (!User) {
            return res.status(409).json({
                message: "Incorrect email or password",
                status: false
            });
        }

        const isMatch = await bcrypt.compare(password, User.password);
        if (!isMatch) {
            return res.status(409).json({
                message: "Incorrect email or password",
                status: false
            });
        }

        if (role !== User.role) {
            return res.status(409).json({
                message: "No user found in this role",
                status: false
            });
        }

        const tokenData = {
            userId: User._id
        };
        const token = await jwt.sign(tokenData, process.env.SecretKey, { expiresIn: "1d" });
        const loggedInUser = {
            _id: User._id,
            fullname: User.fullname,
            email: User.email,
            phone: User.phone,
            role: User.role,
            profile: User.profile
        };
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" }).json({
            message: `Welcome back ${User.fullname}`,
            status: true,
            user: loggedInUser
        });
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "User logged out successfully",
            status: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, phone, email, bio, skills } = req.body;
        const file = req.file;
        // const fileUri = getDataUri(file);
        // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.id;

        let User = await user.findById(userId);
        if (!User) {
            return res.status(404).json({
                message: "User not found",
                status: false
            });
        }

        if (fullname) User.fullname = fullname;
        if (phone) User.phone = phone;
        if (email) User.email = email;
        if (bio) User.profile.bio = bio;
        if (skills) User.profile.skills = skillsArray;

        // if (cloudResponse) {
        //     user.profile.resume = cloudResponse.secure_url // save the cloudinary url
        //     user.profile.resumeOriginalName = file.originalname // Save the original file name
        // }
        await User.save();

        const updatedUser = {
            _id: User._id,
            fullname: User.fullname,
            email: User.email,
            phone: User.phone,
            role: User.role,
            profile: User.profile
        };
        return res.status(200).json({
            message: "Profile updated successfully",
            status: true,
            user: updatedUser
        });

    } catch (error) {
        console.log(error);
    }
}
