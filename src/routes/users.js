import express from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import {userModel} from "../models/users.js"

const router = express.Router();


router.post("/register", async (req, res) => {

    const { username, password } = req.body;

    const user = await userModel.findOne({username }) 
    
    if(user) {
        return res.json({message: "User already exists!"});
    }
    
    const hashedPass = await bcrypt.hash(password , 10)
    
    const newUser = new userModel({username, password: hashedPass})
    await newUser.save();
    
    res.json({message: "User Registered!"})
    
})

router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    
    const user = await userModel.findOne({username })
    if(!user){
        return res.json({message: "User doesn't exists!"})
    }

    const isValid = await bcrypt.compare(password, user.password)

    if(!isValid){
        return res.json({message: "Username or Password Is Incorrect!!!"})
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

    res.json({token, userId: user._id})
    
})









export { router as userRouter };