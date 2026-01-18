import express from "express";
import  isloggedin  from "../middlewares/authrise.js";
import getusercontroller from "../controller/getusercontroller.js"
import { Router } from "express";
const usercontext = Router();
usercontext.get("/getuser", isloggedin, getusercontroller.getuser);
export default usercontext;