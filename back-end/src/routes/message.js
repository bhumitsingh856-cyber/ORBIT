import express from "express";
import { Router } from "express";
import isloggedin from "../middlewares/authrise.js";
import messagecontroller from "../controller/messagecontroller.js"
const messageRouter = Router();
messageRouter.get("/message/:id", isloggedin, messagecontroller.chatExists);
export default messageRouter;