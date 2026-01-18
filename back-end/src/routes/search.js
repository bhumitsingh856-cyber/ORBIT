import express from "express";
import { Router } from "express";
import searchcontroller from "../controller/searchcontroller.js"
import  isLoggedin from "../middlewares/authrise.js";
const searchRouter = Router();
searchRouter.get("/search/:search",isLoggedin, searchcontroller.getsearch);
searchRouter.get("/random",isLoggedin, searchcontroller.getrandom);
export default searchRouter;