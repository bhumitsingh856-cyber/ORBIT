import express from "express"; 
import { Router } from "express";
import getpostscontroller from "../controller/getpostscontroller.js"
import isloggedin from "../middlewares/authrise.js";
import deletepostcontroller from "../controller/deletepostcontroller.js";
import likepostcontroller from "../controller/likepostcontroller.js";
const getpostsroute=Router();

getpostsroute.get("/getposts",isloggedin,getpostscontroller.getallposts);
getpostsroute.delete("/deletepost/:id",isloggedin,deletepostcontroller.deletepost)
getpostsroute.get("/likepost/:id",isloggedin,likepostcontroller.likepost);
getpostsroute.put("/editpost/:id",isloggedin,likepostcontroller.editpost)
getpostsroute.post("/posts/comment/:id",isloggedin,getpostscontroller.comment);
getpostsroute.delete("/posts/deletecomment/:id/:commentid",isloggedin,getpostscontroller.deletecomment);
export default getpostsroute;