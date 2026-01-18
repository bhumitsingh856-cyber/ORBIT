import express from "express";
import upload from "../config/cloudstorage.js";
import { Router } from "express";
import createstorycontroller from "../controller/storycontroller.js"
import isloggedin from "../middlewares/authrise.js";
const storyrouter=Router();
storyrouter.post("/createstory", upload.array("image", 10) ,isloggedin,createstorycontroller.createstory)
storyrouter.get("/getstory",isloggedin,createstorycontroller.getstory)
storyrouter.post("/storyview/:id",isloggedin,createstorycontroller.storyView);
storyrouter.delete("/deletestory/:id",isloggedin,createstorycontroller.deletestory)
export default storyrouter;