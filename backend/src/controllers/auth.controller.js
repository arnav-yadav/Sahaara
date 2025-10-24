import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { upsertStreamUser } from "../lib/stream.js";

export async function signup(req, res) {
    const { fullName, email, password } = req.body;

    try { 
        //Basic field validation
        if(!fullName || !email || !password){ 
            return res.status(400).json({ message: "All fields are required" });
        }

        //Password length validation
        if(password.length < 6){
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        //Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: "User already exists with this email" });
        }

        //Random avatar generation
        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

        // Create new user
        const newUser = await User.create({
            fullName,
            email,
            password,
            profilePic: randomAvatar,
        });

        //Create Stream user
        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                email: newUser.email,
                image: newUser.profilePic || "",
            });

            console.log(`Stream user created for ${newUser.email}`);
        } catch (error) {
            console.error("Error creating Stream user:", error);
        }

        //JWT token generation
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        })

        res.status(201).json({success: true, user:newUser})
    }
    catch (error) {
        console.log("Error in signup controller", error);
        res.status(500).json({ message: "Internal sever error", error: error.message });
    }
} 

export async function login(req, res) {
    const { email, password } = req.body;

    try {
        //Basic field validation
        if(!email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({ message: "Invalid email or password" });
        }
        //Check password
        const isPasswordCorrect = await user.matchPassword(password);
        if(!isPasswordCorrect){
            return res.status(401).json({ message: "Invalid email or password" });
        }
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" }); 

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        })

        res.status(200).json({ success: true, user: user });


    }
    catch (error) {
        console.log("Error in login controller", error);
        res.status(500).json({ message: "Internal sever error", error: error.message });
    }
}        

export async function logout(req, res) {
    res.clearCookie("jwt")
    res.status(200).json({ message: "Logged out successfully" });
}

export async function onboard(req, res) {
    try {
        const userId = req.user._id;
        const { fullName, bio, canSupport, needSupport, location } = req.body;
        
        //Basic field validation
        if(!fullName || !bio || !canSupport || !needSupport || !location){
            return res.status(400).json({
                 message: "All fields are required for onboarding",
                 missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !canSupport && "canSupport",
                    !needSupport && "needSupport",
                    !location && "location",
                 ].filter(Boolean),
                });
        }

        //Update user details
        const updatedUser = await User.findByIdAndUpdate(userId,{
            ...req.body,
            isOnboarded: true,
        }, { new: true })

        if(!updatedUser){
            return res.status(404).json({ message: "User not found" });
        }

        //Update Stream user
        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || "",
            })
            console.log(`Stream user updated for ${updatedUser.email}`);
        } catch (error) {
            console.error("Error updating Stream user:", error);
        }
        

        res.status(200).json({ success: true, user: updatedUser });

    } catch (error) {
        console.log("Error in onboard controller", error);
        res.status(500).json({ message: "Internal sever error", error: error.message });
    }
}