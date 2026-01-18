import express from "express";
import createpostcontroller from "../controller/createpostcontroller.js" 
import { Router } from "express";
import isloggedin from "../middlewares/authrise.js";
import upload from "../config/cloudstorage.js";
const createpostroute=Router();

createpostroute.post("/createpost",upload.fields([{ name: "image", maxCount: 10 },{ name: "video", maxCount: 1 }]),isloggedin,createpostcontroller.newpost)
export default createpostroute;