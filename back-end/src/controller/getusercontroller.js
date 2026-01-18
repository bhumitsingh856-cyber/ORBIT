import express from "express";
import User from "../models/user.js"  
const getuser=async(req,res)=>{
    const id=req.user._id;
    const details=await User.findById(id);   
    res.json(details);
}
export default {getuser};