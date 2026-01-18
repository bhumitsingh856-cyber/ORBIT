import express from "express"
import getprofilecontroller from "../controller/getprofilecontroller.js";
import { Router } from "express"
import upload from "../config/cloudstorage.js"
import isloggedin from "../middlewares/authrise.js";
const getprofileroute=Router();

getprofileroute.get("/getprofile",isloggedin,getprofilecontroller.getprofile)
getprofileroute.get("/getprofile/:username",isloggedin,getprofilecontroller.getothersprofile);
getprofileroute.put("/getprofile/follow/:id",isloggedin,getprofilecontroller.follow);
getprofileroute.get("/getfollowers/:username",isloggedin,getprofilecontroller.getfollowers)
getprofileroute.get("/getfollowings/:username",isloggedin,getprofilecontroller.getfollowings)
getprofileroute.put("/editprofilepage/:id",isloggedin,upload.single("image"),getprofilecontroller.editprofile)
export default getprofileroute;