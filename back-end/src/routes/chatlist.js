import express from "express";
import { Router } from "express";
import ChatList from "../models/chatlist.js"
import isloggedin from "../middlewares/authrise.js";
import chatlistcontroller from "../controller/chatlistcontroller.js";
const chatlistRouter=Router();
chatlistRouter.get("/getchatlist", isloggedin , chatlistcontroller.getchatlist); 
chatlistRouter.get("/getAichat", isloggedin , chatlistcontroller.getAichat);
chatlistRouter.get("/getchat/:chatid", isloggedin , chatlistcontroller.getchat);    
export default chatlistRouter;