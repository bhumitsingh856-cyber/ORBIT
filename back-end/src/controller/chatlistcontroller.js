import ChatList from "../models/chatlist.js"
import OrbitAi from "../models/orbitai.js"
import messages from "../models/messages.js";
const getchatlist=async(req,res)=>{
    try {
        const list=await ChatList.find({participants:{$in:[req.user._id]}}).populate("participants","username profilePicture ").populate("lastMessage").sort({updatedAt:-1});
        list.map((e)=>(
            e.participants=e.participants.filter((e)=>e._id.toString()!==req.user._id.toString())     
        ))
        res.json(list);
    } catch (error) {
        console.log(error);   
    }
}
const getAichat=async(req,res)=>{
    const chat=await OrbitAi.findOne({user:req.user._id});
    const data={
        lastMessage:chat.lastMessage,
        updatedAt:chat.updatedAt,
    }
    res.json(data);
    
}

const getchat=async(req,res)=>{
    try{
        const chat=await messages.findOne({chatId:req.params.chatid});
       
        res.json(chat);
    }catch(err){
        console.log(err);
    }
}

export default {getchatlist,getAichat,getchat};