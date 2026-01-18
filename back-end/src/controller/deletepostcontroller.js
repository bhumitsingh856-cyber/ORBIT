import Post from "../models/post.js";
import User from "../models/user.js"
const deletepost=async(req,res)=>{
    try {
        const id=req.user._id;
        const postid=req.params.id;
        const post=await Post.findById(postid);
        await post.deleteOne();
        const user=await User.findById(id);
        user.posts.pull(postid);
        await user.save();
        res.json({success:true,message:"Post deleted successfully"})
    } catch (err) {
        console.log(err);
        
        res.json({success:false,message:"Internal server error"})
    }
}

export default {deletepost};